const PASS_MARK = 50;
const MIN_ATTENDANCE = 75;

function getGradeLetter(average) {
    if (average >= 90) return "A";
    if (average >= 80) return "B";
    if (average >= 70) return "C";
    if (average >= 60) return "D";
    if (average >= PASS_MARK) return "E";
    return "F";
}

function getFinalResult(average, attendance) {
    if (average >= PASS_MARK && attendance >= MIN_ATTENDANCE) {
        return "ناجح";
    }

    return "يحتاج إلى مراجعة";
}

document.getElementById("analyzeBtn").addEventListener("click", function () {
    const rawGrades = [
        document.getElementById("grade1").value.trim(),
        document.getElementById("grade2").value.trim(),
        document.getElementById("grade3").value.trim()
    ];
    const rawAttendance = document.getElementById("attendance").value.trim();
    const reportBox = document.getElementById("reportBox");

    reportBox.style.display = "block";

    if (rawGrades.some(grade => grade === "") || rawAttendance === "") {
        reportBox.innerHTML =
            '<p style="color: red; font-weight: bold;">خطأ: يرجى إدخال الدرجات الثلاث ونسبة الحضور.</p>';
        return;
    }

    const grades = rawGrades.map(Number);
    const attendance = Number(rawAttendance);
    const allValues = [...grades, attendance];

    if (allValues.some(value => !Number.isFinite(value) || value < 0 || value > 100)) {
        reportBox.innerHTML =
            '<p style="color: red; font-weight: bold;">خطأ: يجب أن تكون الدرجات ونسبة الحضور بين 0 و100.</p>';
        return;
    }

    const total = grades.reduce((sum, grade) => sum + grade, 0);
    const average = total / grades.length;
    const letter = getGradeLetter(average);
    const result = getFinalResult(average, attendance);

    reportBox.innerHTML = `
        <h4>تقرير الطالب</h4>
        <p>مجموع الدرجات: <strong>${total}</strong></p>
        <p>المتوسط: <strong>${average.toFixed(1)}</strong></p>
        <p>التقدير: <strong>${letter}</strong></p>
        <p>الحالة: <strong>${result}</strong></p>
    `;
});
