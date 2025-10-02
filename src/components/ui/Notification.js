import React, { useEffect } from 'react';
import '../ui/notification.css';

export default function Notification({ open, type = 'info', message = '', autoClose = 6000, onClose }) {
  useEffect(() => {
    if (!open) return;
    if (!autoClose) return;
    const t = setTimeout(() => onClose && onClose(), autoClose);
    return () => clearTimeout(t);
  }, [open, autoClose, onClose]);

  if (!open) return null;

  const getTitle = () => {
    switch (type) {
      case 'error': return 'Booking Error';
      case 'success': return 'Booking Successful';
      case 'warning': return 'Warning';
      default: return 'Notice';
    }
  };

  const getIcon = () => {
    switch (type) {
      case 'error': return '⚠️';
      case 'success': return '✅';
      case 'warning': return '⚠️';
      default: return 'ℹ️';
    }
  };

  return (
    <div className={`ws-notif-overlay ws-notif-${type}`} role="dialog" aria-live="assertive">
      <div className="ws-notif-card">
        <div className="ws-notif-body">
          <div className="ws-notif-title">
            <span className="ws-notif-icon">{getIcon()}</span>
            {getTitle()}
          </div>
          <div className="ws-notif-message">{Array.isArray(message) ? message.join(' ') : message}</div>
        </div>
        <div className="ws-notif-actions">
          <button className="ws-notif-btn" onClick={() => onClose && onClose()}>OK</button>
        </div>
      </div>
    </div>
  );
}
