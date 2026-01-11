// ALL DATA MUST COME FROM n8n WEBHOOKS
// Frontend NEVER decides logic

document.getElementById("loginForm")?.addEventListener("submit", e => {
  e.preventDefault();

  fetch("https://n8n-your-webhook/login", {
    method:"POST",
    headers:{ "Content-Type":"application/json" },
    body:JSON.stringify({
      email:e.target[0].value,
      password:e.target[1].value
    })
  })
  .then(r=>r.json())
  .then(data=>{
    localStorage.setItem("user",JSON.stringify(data));
    location.href="dashboard.html";
  });
});
