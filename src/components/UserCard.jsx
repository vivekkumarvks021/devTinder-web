import { Briefcase, MapPin, X, Heart, Navigation } from "lucide-react";
import useSwipe from "../hooks/useSwipe";

const UserCard = ({ user, onIgnore, onInterested, actionLoading }) => {
  const {
    currentX,
    dragging,
    handlePointerDown,
    handlePointerMove,
    handlePointerUp,
  } = useSwipe({
    onSwipeLeft: onIgnore,
    onSwipeRight: onInterested,
    disabled: actionLoading,
  });
  const {
    firstName,
    lastName,
    age,
    photoUrl,
    about,
    skills = [],
    designation,
    company,
    location,
    distance,
  } = user;

  const stopSwipeOnButton = (e) => {
    e.stopPropagation();
  };

  return (
    <div
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      style={{
        transform: `translateX(${currentX}px) rotate(${currentX / 25}deg)`,
        transition: dragging ? "none" : "transform 0.25s ease",
        touchAction: "pan-y",
      }}
      className="
        relative
        flex
        h-[calc(100vh-100px)]
        max-h-180
        w-full
        max-w-110
        flex-col
        overflow-hidden
        rounded-3xl
        border
        border-base-content/10
        bg-base-100
        shadow-2xl
        select-none"
    >
      {/* Profile Image */}
      <div className="relative min-h-0 flex-[1.15]">
        <img
          src={photoUrl}
          alt={`${firstName} ${lastName}`}
          className="h-full w-full object-cover"
          onError={(e) => {
            e.currentTarget.src = "/male-avatar.png";
          }}
        />

        {/* Distance */}
        {distance && (
          <div
            className="
              absolute
              right-4
              top-4
              flex
              items-center
              gap-2
              rounded-full
              bg-black/55
              px-3
              py-1.5
              text-xs
              text-white
              backdrop-blur-md
            "
          >
            <Navigation size={14} />
            {distance}
          </div>
        )}
      </div>

      {/* User Details */}
      <div className="flex-1 p-5">
        {/* Name + Age */}
        <div className="flex items-end gap-2">
          <h2 className="text-2xl font-bold">
            {firstName} {lastName}
          </h2>

          {age && (
            <span className="text-xl font-light text-base-content/60">
              {age}
            </span>
          )}
        </div>

        {/* Job */}
        {(designation || company) && (
          <div className="mt-2 flex items-center gap-2 text-sm text-base-content/70">
            <Briefcase size={16} />

            <span>
              {designation}
              {company && ` at ${company}`}
            </span>
          </div>
        )}

        {/* Location */}
        {location && (
          <div className="mt-1.5 flex items-center gap-2 text-sm text-base-content/70">
            <MapPin size={16} />

            <span>{location}</span>
          </div>
        )}

        {/* About */}
        {about && (
          <p className="mt-3 line-clamp-3 text-sm leading-5 text-base-content/80">
            {about}
          </p>
        )}

        {/* Skills */}
        {skills.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-2">
            {skills.slice(0, 6).map((skill) => (
              <span
                key={skill}
                className="
                  rounded-full
                  bg-primary/10
                  px-3
                  py-1
                  text-xs
                  font-medium
                  text-primary
                "
              >
                {skill}
              </span>
            ))}
          </div>
        )}

        {/* Actions */}
        <div className="mt-4 flex justify-center gap-16">
          {/* Ignore */}
          <div className="flex flex-col items-center gap-1">
            <button
              type="button"
              onPointerDown={stopSwipeOnButton}
              onClick={onIgnore}
              disabled={actionLoading === "ignored"}
              className="
                flex h-14 w-14
                items-center justify-center
                rounded-full
                border-2 border-error/40
                text-error
                transition-all duration-200
                hover:scale-105
                hover:border-error
                hover:bg-error
                hover:text-error-content
                disabled:cursor-not-allowed
                disabled:opacity-50
                "
            >
              {actionLoading ? (
                <span className="loading loading-spinner loading-sm" />
              ) : (
                <X size={27} />
              )}
            </button>

            <span className="text-xs text-base-content/60">Ignore</span>
          </div>

          {/* Interested */}
          <div className="flex flex-col items-center gap-1">
            <button
              type="button"
              onPointerDown={stopSwipeOnButton}
              onClick={onInterested}
              disabled={actionLoading === "interested"}
              className="
                flex h-14 w-14
                items-center justify-center
                rounded-full
                border-2 border-success/40
                text-success
                transition-all duration-200
                hover:scale-105
                hover:border-success
                hover:bg-success
                hover:text-success-content
                disabled:cursor-not-allowed
                disabled:opacity-50
            "
            >
              {actionLoading ? (
                <span className="loading loading-spinner loading-sm" />
              ) : (
                <Heart size={26} fill="currentColor" />
              )}
            </button>

            <span className="text-xs text-base-content/60">Interested</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
