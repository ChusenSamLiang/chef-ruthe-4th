import { NextResponse } from 'next/server';
export const dynamic = 'force-dynamic';
import { getDb } from '@/lib/db';
import { z } from 'zod';

const bookingSchema = z.object({
    name: z.string().min(2),
    email: z.string().email(),
    phone: z.string().optional(),
    date: z.string().optional(),
    guests: z.number().int().positive().optional(),
    serviceType: z.string().optional(),
    message: z.string().optional(),
});

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const validatedData = bookingSchema.parse(body);

        const db = getDb();
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

        return NextResponse.json({ success: true, id: result.lastInsertRowid }, { status: 201 });
    } catch (error) {
        console.error('Booking error:', error);
        if (error instanceof z.ZodError) {
            return NextResponse.json({ success: false, errors: error.errors }, { status: 400 });
        }
        return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 });
    }
}
