// Test script untuk POST profile ke API
fetch("http://localhost:3000/api/profiles", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    xUsername: "testuser",
    displayName: "Test User",
    bio: "Testing profile creation",
    niche: "Web3",
    country: "Indonesia",
    lookingFor: ["Mutuals", "Engagement"],
  }),
})
  .then(res => res.json())
  .then(data => console.log("Response:", data))
  .catch(err => console.error("Error:", err));
