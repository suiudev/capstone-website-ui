import React, { useState, useEffect } from 'react';
import './clock-overlay.css';

export default function ClockOverlay({ 
  isOpen, 
  onClose, 
  onConfirm, 
  initialHours = 8, 
  maxHours = 10,
  hallType = "Pavilion"
}) {
  const [hours, setHours] = useState(initialHours);
  const [startTime, setStartTime] = useState("10:00");
  const [endTime, setEndTime] = useState("18:00");

  useEffect(() => {
    if (isOpen) {
      setHours(initialHours);
      setStartTime("10:00");
      setEndTime("18:00");
    }
  }, [isOpen, initialHours]);

  const handleHoursChange = (newHours) => {
    const clampedHours = Math.max(newHours, 1); // allow exceeding; compute overtime
    setHours(clampedHours);
    
    // Calculate end time based on start time and duration
    const [startHour, startMin] = startTime.split(':').map(Number);
    const endHour = (startHour + clampedHours) % 24;
    const endTimeStr = `${endHour.toString().padStart(2, '0')}:${startMin.toString().padStart(2, '0')}`;
    setEndTime(endTimeStr);
  };

  const handleStartTimeChange = (newStartTime) => {
    setStartTime(newStartTime);
    
    // Recalculate end time
    const [startHour, startMin] = newStartTime.split(':').map(Number);
    const endHour = (startHour + hours) % 24;
    const endTimeStr = `${endHour.toString().padStart(2, '0')}:${startMin.toString().padStart(2, '0')}`;
    setEndTime(endTimeStr);
  };

  const handleConfirm = () => {
    onConfirm({
      duration_hours: hours,
      event_time_start: startTime,
      event_time_end: endTime
    });
    onClose();
  };

  const getOvertimeHours = () => {
    const maxAllowed = hallType === "Rooftop" ? 4 : maxHours;
    return Math.max(0, hours - maxAllowed);
  };

  const getOvertimeCharge = () => {
    return getOvertimeHours() * 1000; // ₱1,000 per hour
  };

  if (!isOpen) return null;

  return (
    <div className="clock-overlay">
      <div className="clock-modal">
        <div className="clock-header">
          <h3>Select Event Duration</h3>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>
        
        <div className="clock-content">
          <div className="time-selection">
            <div className="time-group">
              <label>Start Time</label>
              <input
                type="time"
                value={startTime}
                onChange={(e) => handleStartTimeChange(e.target.value)}
                min={hallType === "Pavilion" ? "10:00" : "00:00"}
                max={hallType === "Pavilion" ? "21:00" : "23:59"}
              />
            </div>
            
            <div className="duration-group">
              <label>Duration (Hours)</label>
              <div className="duration-controls">
                <button 
                  onClick={() => handleHoursChange(hours - 1)}
                  disabled={hours <= 1}
                  className="duration-btn"
                >
                  −
                </button>
                <span className="duration-display">{hours} hours</span>
                <button 
                  onClick={() => handleHoursChange(hours + 1)}
                  disabled={hours >= (hallType === "Rooftop" ? 4 : maxHours)}
                  className="duration-btn"
                >
                  +
                </button>
              </div>
            </div>
            
            <div className="time-group">
              <label>End Time</label>
              <input
                type="time"
                value={endTime}
                readOnly
                className="readonly-time"
              />
            </div>
          </div>

          <div className="pricing-breakdown">
            <div className="pricing-item">
              <span>Base Duration:</span>
              <span>{Math.min(hours, hallType === "Rooftop" ? 4 : maxHours)} hours</span>
            </div>
            {getOvertimeHours() > 0 && (
              <div className="pricing-item overtime">
                <span>Overtime ({getOvertimeHours()} hours):</span>
                <span>₱{getOvertimeCharge().toLocaleString()}</span>
              </div>
            )}
            <div className="pricing-total">
              <span>Total Duration:</span>
              <span>{hours} hours</span>
            </div>
          </div>

          <div className="warning" style={{ marginTop: 12 }}>
            <div>Notes:</div>
            <div>• Rooftop includes up to 4 hours; Pavilion includes up to {maxHours} hours. Exceeding hours adds PHP 1,000/hour.</div>
            <div>• Pavilion operating hours 10:00–21:00. Times beyond may not be permitted.</div>
            <div>• We do not cover other needs (e.g., overnight). If you select overtime that extends past 23:00, rooms can be booked via walk-in if available.</div>
          </div>
        </div>

        <div className="clock-actions">
          <button className="cancel-btn" onClick={onClose}>Cancel</button>
          <button 
            className="confirm-btn" 
            onClick={handleConfirm}
          >
            Confirm Duration
          </button>
        </div>
      </div>
    </div>
  );
}
