import { NextResponse } from 'next/server';
export const dynamic = 'force-dynamic';
import globalDb from '../../../../lib/db';
import { User } from '../../../../types';

const SIMULATE_DELAY = parseInt(process.env.NEXT_PUBLIC_API_SIMULATE_DELAY || '0', 10);
const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

function getUserFromHeader(req: Request): User {
  const role = req.headers.get('x-user-role') || 'viewer';
  return { id: 'u1', name: 'Current User', role: role as any };
}

export async function GET(request: Request, { params }: { params: { id: string } }) {
  if (SIMULATE_DELAY) await delay(SIMULATE_DELAY);

  const c = globalDb.getCaseById(params.id);
  if (!c) return NextResponse.json({ error: 'Not found' }, { status: 404 });

  const logs = globalDb.getLogsForCase(params.id);
  return NextResponse.json({ case: c, logs });
}

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  if (SIMULATE_DELAY) await delay(SIMULATE_DELAY);

  const user = getUserFromHeader(request);
  if (user.role === 'viewer') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
  }

  try {
    const body = await request.json();
    const updated = globalDb.updateCase(params.id, body.updates, user, body.note);
    if (!updated) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    return NextResponse.json(updated);
  } catch (err) {
    return NextResponse.json({ error: 'Invalid payload' }, { status: 400 });
  }
}

export async function POST(request: Request, { params }: { params: { id: string } }) {
  if (SIMULATE_DELAY) await delay(SIMULATE_DELAY);

  const user = getUserFromHeader(request);
  if (user.role === 'viewer') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
  }

  try {
    const body = await request.json();
    if (body.action === 'add_note') {
      const log = globalDb.addManualLog(params.id, body.note, user);
      return NextResponse.json(log);
    }
    return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
  } catch (err) {
    return NextResponse.json({ error: 'Invalid payload' }, { status: 400 });
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  if (SIMULATE_DELAY) await delay(SIMULATE_DELAY);

  const user = getUserFromHeader(request);
  if (user.role !== 'admin') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
  }

  const success = globalDb.deleteCase(params.id, user);
  if (!success) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json({ success: true });
}
