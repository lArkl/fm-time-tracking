const data = {
  user: "Jeremy Robson",
  report: {
    work: {
      daily: { prev: "7hrs", now: "5hrs"},
      weekly: { prev: "36hrs", now: "32hrs"},
      monthly: { prev: "103hrs", now: "128hrs"},
    },
    play: {
      daily: {now: "1hr", prev: "2hrs"},
      weekly: {now: "10hrs", prev: "8hrs"},
      monthly: {now: "23hrs", prev: "29hrs"}
    },
    study: {
      daily: {now: "0hr", prev: "1hr"},
      weekly: {now: "4hrs", prev: "7hrs"},
      monthly: {now: "13hrs", prev: "19hrs"}
    },
    exercise: {
      daily: {now: "1hr", prev: "1hr"},
      weekly: {now: "4hrs", prev: "5hrs"},
      monthly: {now: "1hr", prev: "18hrs"}
    },
    social: {
      daily: {now: "1hr", prev: "3hrs"},
      weekly: {now: "5hrs", prev: "10hrs"},
      monthly: {now: "21hrs", prev: "23hrs"}
    },
    "self-care": {
      daily: {now: "0hr", prev: "1hr"},
      weekly: {now: "2hrs", prev: "2hrs"},
      monthly: {now: "7hrs", prev: "11hrs"}
    }
  }
};
const periodDict = {
  daily: "Day",
  weekly: "Week",
  monthly: "Month"
};
let selectedFrequency;

const reportsRef = document.querySelector(".reports");
const frequenciesRef = document.querySelectorAll("nav > a");
const reportsNodes = initReports();

frequenciesRef.forEach(freqRef => {
  freqRef.addEventListener('click', (ev) => {
    const frequency = ev.target.innerText.toLowerCase();
    if (frequency === selectedFrequency) return;
    frequenciesRef.forEach(fRef => fRef.className="");
    freqRef.className = "user__frequency--selected";
    Object.entries(data.report).map(([task, periodsValues], index) => {
      const { prev, now } = periodsValues[frequency];
      const period = periodDict[frequency];
      const nodes = reportsNodes[index];
      updateReport(nodes, task, period, now, prev);
    });
    selectedFrequency = frequency;
  })
});

function initReports() {
  frequenciesRef[0].className = "user__frequency--selected";
  selectedFrequency = frequenciesRef[0].innerText.toLowerCase();
  return Object.entries(data.report).map(([task, periodsValues]) => {
    const { prev, now } = periodsValues[selectedFrequency];
    const period = periodDict[selectedFrequency];
    const nodes = createReport();
    updateReport(nodes, task, period, now, prev);
    return nodes;
  });
}

function createReport() {
  const reportArticleNode = document.createElement("article");
  reportsRef.appendChild(reportArticleNode);

  const reportBackgroundNode = document.createElement("div");
  reportArticleNode.appendChild(reportBackgroundNode);

  const reportContentNode = document.createElement("div");
  reportContentNode.className = "reports__content";
  reportArticleNode.appendChild(reportContentNode);

  const reportTaskNode = document.createElement("h2");
  reportContentNode.appendChild(reportTaskNode);

  const reportCurrNode = document.createElement("h3");
  reportContentNode.appendChild(reportCurrNode);

  const reportPrevNode = document.createElement("h3");
  reportContentNode.appendChild(reportPrevNode);

  const reportOptionNode = document.createElement("div");
  const reportOptionImgNode = document.createElement("img");
  reportOptionImgNode.src = "./images/icon-ellipsis.svg";
  reportOptionNode.appendChild(reportOptionImgNode);

  reportContentNode.appendChild(reportOptionNode);
  return {reportTaskNode, reportCurrNode, reportPrevNode, reportOptionImgNode, reportBackgroundNode}
}

function updateReport(nodes, task, period, now, prev) {
  const {reportTaskNode, reportCurrNode, reportPrevNode, reportOptionImgNode, reportBackgroundNode} = nodes;
  reportBackgroundNode.className = `reports__background reports__${task}`;

  reportTaskNode.innerText = task.split("-").map(word => word[0].toUpperCase() + word.slice(1)).join(" ");
  reportCurrNode.innerText = now
  reportPrevNode.innerText = `Last ${period} - ${prev}`
  reportOptionImgNode.alt = `${task} options`;
}
