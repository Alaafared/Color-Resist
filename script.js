const colors = [
    "black", "brown", "red", "orange", "yellow",
    "green", "blue", "violet", "gray", "white", "gold", "silver"
];

const colorNames = [
    "أسود", "بني", "أحمر", "برتقالي", "أصفر",
    "أخضر", "أزرق", "بنفسجي", "رمادي", "أبيض", "ذهبي", "فضي"
];

const colorValues = {
    black: 0, brown: 1, red: 2, orange: 3, yellow: 4,
    green: 5, blue: 6, violet: 7, gray: 8, white: 9,
    gold: -1, silver: -2
};

const tolerances = {
    brown: "±1%", red: "±2%", green: "±0.5%",
    blue: "±0.25%", violet: "±0.1%", gray: "±0.05%",
    gold: "±5%", silver: "±10%"
};

function createColorOptions() {
    colors.forEach((color, index) => {
        for (let i = 1; i <= 6; i++) {
            const select = document.getElementById(`color${i}`);
            const option = document.createElement("option");
            option.value = color;
            option.textContent = colorNames[index];
            select.appendChild(option);
        }
    });
}

function updateBands() {
    const bandCount = document.getElementById("band-count").value;
    for (let i = 5; i <= 6; i++) {
        const band = document.getElementById(`band${i}`);
        const select = document.getElementById(`color${i}`);
        if (i <= bandCount) {
            band.classList.remove("hidden");
            select.classList.remove("hidden");
        } else {
            band.classList.add("hidden");
            select.classList.add("hidden");
        }
    }
}

function setColor(bandNumber) {
    const color = document.getElementById(`color${bandNumber}`).value;
    const band = document.getElementById(`band${bandNumber}`);
    band.style.backgroundColor = color;
}

function calculateResistance() {
    const bandCount = document.getElementById("band-count").value;
    const resultMsg = document.getElementById("result-msg");

    let resistance = 0;
    let multiplier = 1;
    let tolerance = "";

    const digit1 = colorValues[document.getElementById("color1").value] || 0;
    const digit2 = colorValues[document.getElementById("color2").value] || 0;
    const digit3 = bandCount > 4 ? colorValues[document.getElementById("color3").value] || 0 : null;
    multiplier = Math.pow(10, colorValues[document.getElementById("color3").value] || 0);

    if (bandCount === "4" || bandCount === "5") {
        tolerance = tolerances[document.getElementById("color4").value] || "";
    } else if (bandCount === "6") {
        tolerance = tolerances[document.getElementById("color5").value] || "";
    }

    resistance = bandCount > 4
        ? (digit1 * 100 + digit2 * 10 + digit3) * multiplier
        : (digit1 * 10 + digit2) * multiplier;

    const formattedResistance = formatResistance(resistance);

    resultMsg.innerHTML = `
        ${resistance.toLocaleString()} Ω<br>
        ${formattedResistance} ${tolerance}
    `;
}

function formatResistance(resistance) {
    if (resistance >= 1_000_000) {
        return (resistance / 1_000_000).toFixed(2) + "MΩ";
    } else if (resistance >= 1_000) {
        return (resistance / 1_000).toFixed(2) + "kΩ";
    } else {
        return resistance + "Ω";
    }
}

createColorOptions();
