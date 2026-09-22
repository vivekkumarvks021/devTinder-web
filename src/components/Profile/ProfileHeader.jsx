import { UserRound } from "lucide-react";

const ProfileHeader = ({ user }) => {
  const { firstName, lastName, email, age, gender, photoUrl } = user;

  return (
    <div className="bg-primary/10 px-6 py-8">
      <div className="flex flex-col items-center gap-4 sm:flex-row">
        <div className="avatar">
          <div className="h-28 w-28 overflow-hidden rounded-full ring-4 ring-base-100">
            {photoUrl ? (
              <img
                src={photoUrl}
                alt={`${firstName} ${lastName}`}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-base-200">
                <UserRound size={48} />
              </div>
            )}
          </div>
        </div>

        <div className="text-center sm:text-left">
          <h1 className="text-3xl font-bold">
            {firstName} {lastName}
          </h1>

          <p className="mt-1 text-base-content/60">{email}</p>

          {(age || gender) && (
            <p className="mt-2 text-sm capitalize text-base-content/60">
              {age && `${age} years`}
              {age && gender && " • "}
              {gender}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
