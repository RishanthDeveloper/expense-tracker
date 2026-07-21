import { AuthService } from '../services/auth.service';
import { TOKEN_KEY, REFRESH_TOKEN_KEY } from '../api/client';

export async function runAuthTests() {
  console.log('Running AuthService Unit Test...');
  localStorage.clear();

  // Mock fetch for sign in
  const mockAuthResponse = {
    accessToken: 'mock-access-token-jwt',
    refreshToken: 'mock-refresh-token-uuid',
    tokenType: 'Bearer',
    user: {
      id: 'user-123',
      email: 'test@expensetracker.ai',
      fullName: 'Test User',
    },
  };

  (globalThis as any).fetch = async () => ({
    ok: true,
    status: 200,
    json: async () => mockAuthResponse,
  });

  const response = await AuthService.signIn({
    email: 'test@expensetracker.ai',
    password: 'password123',
  });

  if (response.accessToken !== 'mock-access-token-jwt') {
    throw new Error('Test failed: Access token mismatch');
  }

  if (localStorage.getItem(TOKEN_KEY) !== 'mock-access-token-jwt') {
    throw new Error('Test failed: LocalStorage token mismatch');
  }

  // Test sign out
  (globalThis as any).fetch = async () => ({
    ok: true,
    status: 204,
    json: async () => ({}),
  });

  await AuthService.signOut();

  if (localStorage.getItem(TOKEN_KEY) !== null || localStorage.getItem(REFRESH_TOKEN_KEY) !== null) {
    throw new Error('Test failed: LocalStorage tokens not cleared on sign out');
  }

  console.log('✅ AuthService Unit Test Passed!');
}
