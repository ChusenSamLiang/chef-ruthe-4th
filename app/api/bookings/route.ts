import { NextResponse } from 'next/server';
export const dynamic = 'force-dynamic';
import { getDb } from '@/lib/db';
import { z } from 'zod';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

const bookingSchema = z.object({
    name: z.string().min(2),
    email: z.string().email(),
    phone: z.string().optional(),
    date: z.string().optional(),
    guests: z.number().int().positive().optional(),
    serviceType: z.string().optional(),
    message: z.string().optional(),
    subject: z.string().optional(), // Honeypot field
});

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const validatedData = bookingSchema.parse(body);

        // 1. Honeypot check
        if (validatedData.subject) {
            console.log(`[Spam Blocked] Honeypot field filled by: ${validatedData.email}`);
            // Return success to the bot so they don't try harder
            return NextResponse.json({ success: true, message: 'Inquiry received' }, { status: 201 });
        }

        const db = getDb();

        // 2. Rate limiting (5 minutes per email)
        const recentBooking = db.prepare(`
            SELECT id FROM bookings 
            WHERE email = ? AND createdAt > datetime('now', '-5 minutes')
            LIMIT 1
        `).get(validatedData.email);

        if (recentBooking) {
            console.log(`[Rate Limited] Recent submission from: ${validatedData.email}`);
            return NextResponse.json({
                success: false,
                error: 'Please wait a few minutes before submitting another inquiry.'
            }, { status: 429 });
        }

        const stmt = db.prepare(`
      INSERT INTO bookings (name, email, phone, date, guests, serviceType, message)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `);

        const result = stmt.run(
            validatedData.name,
            validatedData.email,
            validatedData.phone || null,
            validatedData.date || null,
            validatedData.guests || null,
            validatedData.serviceType || null,
            validatedData.message || null
        );

        // Send email notification
        try {
            await resend.emails.send({
                from: 'Chef Ruthe 4th <onboarding@resend.dev>',
                to: 'chefruthe4th@gmail.com',
                subject: `New Booking Inquiry: ${validatedData.name}`,
                html: `
                    <h1>New Booking Inquiry</h1>
                    <p><strong>Name:</strong> ${validatedData.name}</p>
                    <p><strong>Email:</strong> ${validatedData.email}</p>
                    <p><strong>Phone:</strong> ${validatedData.phone || 'Not provided'}</p>
                    <p><strong>Date:</strong> ${validatedData.date || 'Not provided'}</p>
                    <p><strong>Guests:</strong> ${validatedData.guests || 'Not provided'}</p>
                    <p><strong>Service Type:</strong> ${validatedData.serviceType || 'Not provided'}</p>
                    <p><strong>Message:</strong> ${validatedData.message || 'No message provided'}</p>
                    <hr />
                    <p>Sent from Chef Ruthe 4th Website</p>
                `
            });
        } catch (emailError) {
            console.error('Failed to send email:', emailError);
            // We don't fail the whole request if only the email fails, 
            // since the booking is already saved to the database.
        }

        return NextResponse.json({ success: true, id: result.lastInsertRowid }, { status: 201 });
    } catch (error) {
        console.error('Booking error:', error);
        if (error instanceof z.ZodError) {
            return NextResponse.json({ success: false, errors: error.errors }, { status: 400 });
        }
        return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 });
    }
}
