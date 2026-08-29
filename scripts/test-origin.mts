async function testOrigin() {
  const families = ["button", "accordion", "badge", "dialog", "input", "switch"];
  for (const f of families) {
    const url = `https://coss.com/origin/r/${f}.json`;
    try {
      const res = await fetch(url, { headers: { "User-Agent": "Mozilla/5.0" } });
      console.log(`Fetch ${f}: status ${res.status}`);
      if (res.ok) {
        const data = await res.json();
        console.log(`  name: ${data.name}, files: ${data.files?.length || 0}`);
        if (data.files && data.files.length > 0) {
          console.log(`  first file: ${data.files[0].path || data.files[0].name}`);
        }
      }
    } catch (e: any) {
      console.error(`Error for ${f}: ${e.message}`);
    }
  }
}

testOrigin();
