async function runTests() {
  console.log("--- Testing Backend API ---\n");

  // 1. Test GET /
  console.log("1. Fetching Home Page (GET http://localhost:3000/)");
  let res = await fetch('http://localhost:3000/');
  let text = await res.text();
  console.log("Response:", text, "\n");

  // 2. Test POST /users
  console.log("2. Adding a new user (POST http://localhost:3000/users)");
  res = await fetch('http://localhost:3000/users', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name: "Ram" })
  });
  let json = await res.json();
  console.log("Response:", json, "\n");

  // 3. Test GET /users
  console.log("3. Fetching all users (GET http://localhost:3000/users)");
  res = await fetch('http://localhost:3000/users');
  json = await res.json();
  console.log("Response:", json, "\n");

  // We are skipping the DELETE step so Ram stays in the database!
  console.log("4. Skipping delete step... You can now check http://localhost:3000/users in your browser to see Ram!");

}

runTests();
