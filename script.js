
        const subjectCountInput = document.getElementById('subjectCount');
        const subjectsContainer = document.getElementById('subjectsContainer');
        const percentageDisplay = document.getElementById('percentageDisplay');
        const cgpaDisplay = document.getElementById('cgpaDisplay');
        const calculateBtn = document.getElementById('calculateBtn');

        subjectCountInput.addEventListener('input', function() {
            let value = this.value;
            
            // Only allow numbers up to 2 digits
            if (!/^\d{0,2}$/.test(value)) {
                this.value = value.slice(0, 2);
                return;
            }

            const count = parseInt(value) || 0;
            if (count > 0) {
                subjectsContainer.style.display = 'block';
                subjectsContainer.innerHTML = '';
                
                for (let i = 0; i < count; i++) {
                    const inputGroup = document.createElement('div');
                    inputGroup.className = 'input-group';
                    inputGroup.innerHTML = `
                        <label class="label">Subject ${i + 1} marks</label>
                        <input 
                            type="text" 
                            class="input-field subject-marks" 
                            placeholder="Enter marks (0-100)"
                            maxlength="3"
                        >
                    `;
                    subjectsContainer.appendChild(inputGroup);

                    // Add input validation for marks
                    const marksInput = inputGroup.querySelector('.subject-marks');
                    marksInput.addEventListener('input', function() {
                        let value = this.value;
                        
                        // Only allow numbers up to 3 digits and max value of 100
                        if (!/^\d{0,3}$/.test(value)) {
                            this.value = value.slice(0, 3);
                            return;
                        }

                        const marks = parseInt(value);
                        if (marks > 100) {
                            this.value = '100';
                        }
                    });
                }
            } else {
                subjectsContainer.style.display = 'none';
            }
        });

        calculateBtn.addEventListener('click', function() {
            const marksInputs = document.querySelectorAll('.subject-marks');
            let totalMarks = 0;
            let validInputs = 0;

            marksInputs.forEach(input => {
                const marks = parseFloat(input.value);
                if (!isNaN(marks) && marks >= 0 && marks <= 100) {
                    totalMarks += marks;
                    validInputs++;
                }
            });

            if (validInputs === 0) {
                alert('Please enter valid marks for at least one subject');
                return;
            }

            const percentage = (totalMarks / validInputs).toFixed(2);
            const cgpa = (percentage / 9.5).toFixed(1);

            percentageDisplay.textContent = percentage + '%';
            cgpaDisplay.textContent = cgpa;

        });
