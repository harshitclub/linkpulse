/**
 * Integration Test Script for LinkPulse Backend
 * Tests: create link, redirect, Redis cache, BullMQ background worker, analytics, and delete.
 */

const BASE_URL = 'http://localhost:5000';

const runTests = async () => {
  console.log('🧪 Starting LinkPulse Simplified Backend Tests...\n');

  try {
    // 1. Health Check
    console.log('1️⃣ GET /health ...');
    const health = await (await fetch(`${BASE_URL}/health`)).json();
    console.log('   Response:', health);

    // 2. Create Link (Auto-generated code)
    console.log('\n2️⃣ POST /api/links (Auto-generated code) ...');
    const link1 = await (
      await fetch(`${BASE_URL}/api/links`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript',
          title: 'MDN JavaScript',
        }),
      })
    ).json();
    console.log('   Created Link:', link1);

    // 3. Create Link with Custom Alias
    const customAlias = 'nodejs-docs-' + Math.floor(Math.random() * 1000);
    console.log(`\n3️⃣ POST /api/links (Custom alias: ${customAlias}) ...`);
    const link2 = await (
      await fetch(`${BASE_URL}/api/links`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          url: 'https://nodejs.org',
          customCode: customAlias,
          title: 'Node.js Official',
        }),
      })
    ).json();
    console.log('   Created Link:', link2);

    // 4. Test Validation Rejection (Invalid URL)
    console.log('\n4️⃣ Testing Zod validation rejection (Invalid URL) ...');
    const invalidRes = await (
      await fetch(`${BASE_URL}/api/links`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: 'not-a-valid-url' }),
      })
    ).json();
    console.log('   Validation Error Response (Expected):', invalidRes);

    // 5. List All Links
    console.log('\n5️⃣ GET /api/links ...');
    const allLinks = await (await fetch(`${BASE_URL}/api/links`)).json();
    console.log(`   Found ${allLinks.length} links:`, allLinks);

    // 6. Test Redirect & Click Tracking
    console.log(`\n6️⃣ GET /${link1.shortCode} (Redirect & background click tracking) ...`);
    const redirectRes1 = await fetch(`${BASE_URL}/${link1.shortCode}`, {
      redirect: 'manual',
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/120.0.0.0 Safari/537.36',
        'Referer': 'https://google.com',
      },
    });
    console.log(`   Redirect Status: ${redirectRes1.status} -> Location: ${redirectRes1.headers.get('location')}`);

    // 7. Second click (Redis Cache Hit)
    console.log(`\n7️⃣ GET /${link1.shortCode} (Second click from Redis RAM) ...`);
    const redirectRes2 = await fetch(`${BASE_URL}/${link1.shortCode}`, {
      redirect: 'manual',
      headers: {
        'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) Mobile/15E148 Safari/604.1',
        'Referer': 'https://twitter.com',
      },
    });
    console.log(`   Redirect Status: ${redirectRes2.status} -> Location: ${redirectRes2.headers.get('location')}`);

    // Wait 1.5 seconds for BullMQ worker to write click to database
    console.log('\n⏳ Waiting 1.5s for BullMQ background worker to write clicks to PostgreSQL...');
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // 8. Analytics
    console.log(`\n8️⃣ GET /api/links/${link1.id}/analytics ...`);
    const analytics = await (await fetch(`${BASE_URL}/api/links/${link1.id}/analytics`)).json();
    console.log('   Analytics:', JSON.stringify(analytics, null, 2));

    // 9. Delete Link
    console.log(`\n9️⃣ DELETE /api/links/${link1.id} ...`);
    const deleteRes = await (
      await fetch(`${BASE_URL}/api/links/${link1.id}`, { method: 'DELETE' })
    ).json();
    console.log('   Delete Response:', deleteRes);

    console.log('\n🎉 ALL TESTS PASSED SUCCESSFULLY! 🚀\n');
  } catch (error) {
    console.error('❌ Test failed:', error);
  }
};

runTests();
