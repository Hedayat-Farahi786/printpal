// @ts-nocheck
import { db } from '@/db';
import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

const VISIT_THRESHOLD = 30 * 60 * 1000; // 30 minutes in milliseconds

export async function POST(req: NextRequest) {
  const userAgent = req.headers.get('user-agent') || '';
  const isMobile = userAgent.includes('Mobile');

  // Get or create session ID
  const cookieStore = cookies();
  let sessionId = cookieStore.get('visitorSessionId')?.value;

  try {
    return await db.$transaction(async (tx) => {
      let session;

      if (sessionId) {
        // Try to find the existing session
        session = await tx.visitorSession.findUnique({
          where: { id: sessionId }
        });
      }

      const now = new Date();

      if (!session) {
        // If session doesn't exist, create a new one
        session = await tx.visitorSession.create({
          data: { lastVisit: now }
        });
        sessionId = session.id;
      } else {
        // Check if enough time has passed since the last visit
        const timeSinceLastVisit = now.getTime() - session.lastVisit.getTime();
        if (timeSinceLastVisit < VISIT_THRESHOLD) {
          return NextResponse.json({ alreadyCounted: true }, { status: 200 });
        }
      }

      // Set or update the cookie
      cookieStore.set('visitorSessionId', sessionId, { 
        httpOnly: true, 
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 365 * 24 * 60 * 60 // 1 year
      });

      // Update the session's lastVisit timestamp
      await tx.visitorSession.update({
        where: { id: sessionId },
        data: { lastVisit: now }
      });

      // Update the count
      const today = new Date(now.setHours(0, 0, 0, 0));
      await tx.visitorCount.upsert({
        where: { date: today },
        update: {
          [isMobile ? 'mobile' : 'desktop']: { increment: 1 },
        },
        create: {
          date: today,
          desktop: isMobile ? 0 : 1,
          mobile: isMobile ? 1 : 0,
        },
      });

      return NextResponse.json({ counted: true }, { status: 200 });
    });
  } catch (error) {
    console.error('Error updating visitor count:', error);
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}