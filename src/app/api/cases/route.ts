import { NextResponse } from 'next/server';
export const dynamic = 'force-dynamic';
import globalDb from '../../../lib/db';
import { FilterParams, User } from '../../../types';
import { validateCase } from '../../../lib/validation';

const SIMULATE_DELAY = parseInt(process.env.NEXT_PUBLIC_API_SIMULATE_DELAY || '0', 10);
const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

function getUserFromHeader(req: Request): User {
  const role = req.headers.get('x-user-role') || 'viewer';
  return { id: 'u1', name: 'Current User', role: role as any };
}

export async function GET(request: Request) {
  if (SIMULATE_DELAY) await delay(SIMULATE_DELAY);

  const { searchParams } = new URL(request.url);
  
  const params: FilterParams = {
    page: parseInt(searchParams.get('page') || '1', 10),
    limit: parseInt(searchParams.get('limit') || '10', 10),
    search: searchParams.get('search') || undefined,
    practiceArea: searchParams.get('practiceArea') as any || undefined,
    status: searchParams.get('status') as any || undefined,
    sortBy: searchParams.get('sortBy') as any || undefined,
    sortDir: searchParams.get('sortDir') as any || undefined,
  };

  const result = globalDb.getCases(params, params.page, params.limit);
  return NextResponse.json(result);
}

export async function POST(request: Request) {
  if (SIMULATE_DELAY) await delay(SIMULATE_DELAY);

  const user = getUserFromHeader(request);
  if (user.role === 'viewer') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
  }

  try {
    const body = await request.json();
    const validation = validateCase(body);
    
    if (!validation.success) {
      return NextResponse.json({ error: 'Validation failed', details: validation.error.flatten() }, { status: 400 });
    }

    const newCase = globalDb.createCase(body, user);
    return NextResponse.json(newCase, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}

export async function DELETE(request: Request) {
  if (SIMULATE_DELAY) await delay(SIMULATE_DELAY);

  const user = getUserFromHeader(request);
  if (user.role !== 'admin') {
    return NextResponse.json({ error: 'Only admins can perform bulk deletes' }, { status: 403 });
  }

  try {
    const { ids } = await request.json();
    if (!Array.isArray(ids)) throw new Error('Expected array of ids');
    
    globalDb.bulkDeleteCases(ids, user);
    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}

export async function PATCH(request: Request) {
  if (SIMULATE_DELAY) await delay(SIMULATE_DELAY);

  const user = getUserFromHeader(request);
  if (user.role === 'viewer') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
  }

  try {
    const { ids, status } = await request.json();
    if (!Array.isArray(ids) || !status) throw new Error('Invalid payload');
    
    globalDb.bulkUpdateStatus(ids, status, user);
    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}
