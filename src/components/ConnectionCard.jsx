import { Briefcase, MapPin, MessageCircle, User } from "lucide-react";

const ConnectionCard = ({ user }) => {
  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-base-content/10 bg-base-100 p-5 shadow-sm sm:flex-row sm:items-center">
      {/* Profile Image */}
      <div className="avatar shrink-0">
        <div className="h-20 w-20 rounded-2xl">
          <img src={user.photoUrl} alt={`${user.firstName} ${user.lastName}`} />
        </div>
      </div>

      {/* Details */}
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <h2 className="truncate text-xl font-semibold">
            {user.firstName} {user.lastName}
          </h2>

          {user.age && <span className="text-base-content/50">{user.age}</span>}
        </div>

        {(user.designation || user.company) && (
          <div className="mt-1 flex items-center gap-2 text-sm text-base-content/60">
            <Briefcase size={15} />

            <span>
              {user.designation}
              {user.company && ` at ${user.company}`}
            </span>
          </div>
        )}

        {user.location && (
          <div className="mt-1 flex items-center gap-2 text-sm text-base-content/60">
            <MapPin size={15} />
            {user.location}
          </div>
        )}

        {user.about && (
          <p className="mt-2 line-clamp-2 text-sm text-base-content/70">
            {user.about}
          </p>
        )}

        {user.skills?.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-2">
            {user.skills.slice(0, 4).map((skill) => (
              <span key={skill} className="badge badge-outline badge-sm">
                {skill}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="flex shrink-0 gap-2 sm:flex-col">
        <button className="btn btn-primary btn-sm">
          <MessageCircle size={16} />
          Chat
        </button>

        <button className="btn btn-ghost btn-sm">
          <User size={16} />
          Profile
        </button>
      </div>
    </div>
  );
};

export default ConnectionCard;
