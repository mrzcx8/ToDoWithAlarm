function setAlarm(task) {
    const now = new Date();
    const alarmTime = new Date();
    const [hours, minutes] = task.alarm.split(':');
    alarmTime.setHours(hours);
    alarmTime.setMinutes(minutes);
    alarmTime.setSeconds(0);

    if (alarmTime > now) {
        const timeDiff = alarmTime - now;
        setTimeout(() => {
            showReminder(task.text);
        }, timeDiff);
    } else {
        alert('The alarm time is in the past!');
    }
}

// Function to show the reminder modal
function showReminder(message) {
    const modal = document.getElementById('reminderModal');
    const reminderMessage = document.getElementById('reminderMessage');
    reminderMessage.textContent = message;
    modal.style.display = 'flex'; // Show the modal
}

// Function to close the modal
function closeModal() {
    const modal = document.getElementById('reminderModal');
    modal.style.display = 'none'; // Hide the modal
}
