// Marksheet generation
document.getElementById('marksForm').addEventListener('submit', function(e) {
  e.preventDefault();

  // Get input values
  const studentName = document.getElementById('studentName').value;
  const rollNo = document.getElementById('rollNo').value;
  const className = document.getElementById('className').value;
  const math = parseInt(document.getElementById('math').value);
  const science = parseInt(document.getElementById('science').value);
  const english = parseInt(document.getElementById('english').value);
  const social = parseInt(document.getElementById('social').value);

  // Set display values
  document.getElementById('displayName').textContent = studentName;
  document.getElementById('displayRollNo').textContent = rollNo;
  document.getElementById('displayClass').textContent = className;

  // Subjects array
  const subjects = [
    { name: 'Math', marks: math },
    { name: 'Science', marks: science },
    { name: 'English', marks: english },
    { name: 'Social Studies', marks: social }
  ];

  const tableBody = document.getElementById('marksTableBody');
  tableBody.innerHTML = '';

  let totalMarks = 0;

  subjects.forEach(subject => {
    const row = document.createElement('tr');
    const grade = getGrade(subject.marks);

    row.innerHTML = `
      <td>${subject.name}</td>
      <td>${subject.marks}</td>
      <td>${grade}</td>
    `;

    tableBody.appendChild(row);
    totalMarks += subject.marks;
  });

  const averageMarks = totalMarks / subjects.length;
  const overallGrade = getGrade(averageMarks);

  document.getElementById('totalMarks').textContent = totalMarks;
  document.getElementById('averageMarks').textContent = averageMarks.toFixed(2);
  document.getElementById('grade').textContent = overallGrade;

  // Show marksheet
  document.getElementById('marksheet').classList.remove('hidden');
});

// Grade calculation
function getGrade(marks) {
  if (marks >= 90) return 'A+';
  if (marks >= 80) return 'A';
  if (marks >= 70) return 'B';
  if (marks >= 60) return 'C';
  if (marks >= 50) return 'D';
  return 'F';
}

// Print button
document.getElementById('printBtn').addEventListener('click', function() {
  window.print();
});

// PDF download button
document.getElementById('downloadPdfBtn').addEventListener('click', function() {
  const marksheetElement = document.getElementById('marksheet');

  html2canvas(marksheetElement).then(canvas => {
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jspdf.jsPDF('p', 'mm', 'a4');

    const imgWidth = 210; // A4 width in mm
    const pageHeight = 295; // A4 height in mm
    const imgHeight = canvas.height * imgWidth / canvas.width;

    pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
    pdf.save('marksheet.pdf');
  });
});

// Text download button
document.getElementById('downloadTextBtn').addEventListener('click', function() {
  const content = `
Student Name: ${document.getElementById('displayName').textContent}
Roll No: ${document.getElementById('displayRollNo').textContent}
Class: ${document.getElementById('displayClass').textContent}
Total Marks: ${document.getElementById('totalMarks').textContent}
Average: ${document.getElementById('averageMarks').textContent}
Overall Grade: ${document.getElementById('grade').textContent}
  `.trim();

  const blob = new Blob([content], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'marksheet.txt';
  a.click();
  URL.revokeObjectURL(url);
});
