// Helper to get query string value (e.g. id=3)
function getQueryParam(param) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}

// Format timestamp to readable date
function formatDate(isoString) {
  const date = new Date(isoString);
  return date.toLocaleString(); // e.g., "Aug 7, 2025, 10:30 AM"
}

document.addEventListener("DOMContentLoaded", () => {
  const analysisId = getQueryParam("id"); // Get ID from URL

  if (!analysisId) {
    document.body.innerHTML = "<h2>❌ Analysis ID not provided.</h2>";
    return;
  }

  fetch("marketAnalysis.json")
    .then(res => res.json())
    .then(data => {
      // Convert ID to number and find the matching analysis
      const analysis = data.find(item => item.id === Number(analysisId));

      if (!analysis) {
        document.body.innerHTML = "<h2>❌ Analysis not found.</h2>";
        return;
      }

      // Fill in page content
      document.getElementById("title").textContent = analysis.title;
      document.getElementById("pair").textContent = analysis.pair;
      document.getElementById("type").textContent = analysis.type;
      document.getElementById("timestamp").textContent = formatDate(analysis.timestamp);
      document.getElementById("details").textContent = analysis.details;
    });
});
