"use client";


export default function makeCalendarPublic() {
  const calendar = getCalendar();
  calendar.setPublic(true);
  console.log('Calendar is now public. Embed URL:', calendar.getId());
  
  // Get the public embed URL
  const calendarId = calendar.getId();
  const embedUrl = `https://calendar.google.com/calendar/embed?src=${encodeURIComponent(calendarId)}&ctz=${Session.getScriptTimeZone()}`;
  
  console.log('Embed URL:', embedUrl);
  return embedUrl;
}


