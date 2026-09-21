import { MapPin } from "lucide-react";
import type { MedDevEvent } from "../../content/events";

export function EventCard({ event }: { event: MedDevEvent }) {
  return (
    <a className="event-card" href={event.url} target="_blank" rel="noreferrer">
      {event.coverUrl ? <img src={event.coverUrl} alt="" loading="lazy" decoding="async" /> : null}
      <div className="event-card__body">
        <span>{event.dateLabel}</span>
        <h3>{event.name}</h3>
        {event.location ? (
          <p className="event-card__location">
            <MapPin size={15} aria-hidden="true" />
            {event.location}
          </p>
        ) : null}
      </div>
    </a>
  );
}
