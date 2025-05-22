function updateFermentationSection(day) {
  const section = document.getElementById("fermentationSection");
  section.innerHTML = `
    <p id="fermentationDayText">Сьогодні: ${day} день ферментації</p>
    <button id="stopFermentationBtn">Зупинити ферментацію</button>
  `;
  attachStopHandler();
}

function attachStopHandler() {
  const stopBtn = document.getElementById("stopFermentationBtn");
  if (stopBtn) {
    stopBtn.addEventListener("click", () => {
      fetch("/stop_fermentation", {
        method: "POST",
        headers: {
          "X-Requested-With": "XMLHttpRequest",
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.status === "stopped") {
            document.getElementById("fermentationSection").innerHTML = `
                  <div></div>
            <button id="startFermentationBtn">Почати ферментацію</button>
          `;
            attachStartHandler();
          }
        });
    });
  }
}

function attachStartHandler() {
  const startBtn = document.getElementById("startFermentationBtn");
  if (startBtn) {
    startBtn.addEventListener("click", () => {
      fetch("/start_fermentation", {
        method: "POST",
        headers: {
          "X-Requested-With": "XMLHttpRequest",
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.status === "success") {
            updateFermentationSection(data.day);
          }
        });
    });
  }
}

attachStartHandler();
attachStopHandler();
