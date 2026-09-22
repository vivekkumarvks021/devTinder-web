import { Pencil } from "lucide-react";

const ProfileView = ({ user, onEdit }) => {
  const { about, skills = [] } = user;

  return (
    <>
      <div>
        <h2 className="font-semibold">About</h2>

        <p className="mt-2 text-sm leading-6 text-base-content/70">
          {about || "No bio added yet."}
        </p>
      </div>

      <div className="mt-6">
        <h2 className="font-semibold">Skills</h2>

        {skills.length > 0 ? (
          <div className="mt-3 flex flex-wrap gap-2">
            {skills.map((skill) => (
              <span key={skill} className="badge badge-primary badge-outline">
                {skill}
              </span>
            ))}
          </div>
        ) : (
          <p className="mt-2 text-sm text-base-content/60">
            No skills added yet.
          </p>
        )}
      </div>

      <div className="mt-8 flex justify-end">
        <button type="button" onClick={onEdit} className="btn btn-primary">
          <Pencil size={17} />
          Edit Profile
        </button>
      </div>
    </>
  );
};

export default ProfileView;
