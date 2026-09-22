const ProfileForm = ({
  formData,
  onChange,
  onSave,
  onCancel,
  saving,
  error,
}) => {
  return (
    <form onSubmit={onSave} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="label">First Name</label>

          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={onChange}
            className="input input-bordered w-full"
            required
          />
        </div>

        <div>
          <label className="label">Last Name</label>

          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={onChange}
            className="input input-bordered w-full"
            required
          />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="label">Age</label>

          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={onChange}
            min="18"
            max="100"
            className="input input-bordered w-full"
          />
        </div>

        <div>
          <label className="label">Gender</label>

          <select
            name="gender"
            value={formData.gender}
            onChange={onChange}
            className="select select-bordered w-full"
          >
            <option value="">Select gender</option>

            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>
      </div>

      <div>
        <label className="label">Photo URL</label>

        <input
          type="url"
          name="photoUrl"
          value={formData.photoUrl}
          onChange={onChange}
          placeholder="https://example.com/profile.jpg"
          className="input input-bordered w-full"
        />
      </div>

      <div>
        <label className="label">About</label>

        <textarea
          name="about"
          value={formData.about}
          onChange={onChange}
          rows={4}
          maxLength={500}
          className="textarea textarea-bordered w-full"
        />

        <div className="mt-1 text-right text-xs text-base-content/50">
          {formData.about.length}/500
        </div>
      </div>

      <div>
        <label className="label">Skills</label>

        <input
          type="text"
          name="skills"
          value={formData.skills}
          onChange={onChange}
          placeholder="React, JavaScript, Node.js"
          className="input input-bordered w-full"
        />

        <p className="mt-1 text-xs text-base-content/50">
          Separate skills using commas
        </p>
      </div>

      {error && (
        <div className="alert alert-error">
          <span>{error}</span>
        </div>
      )}

      <div className="flex justify-end gap-3 pt-3">
        <button
          type="button"
          onClick={onCancel}
          disabled={saving}
          className="btn btn-ghost"
        >
          Cancel
        </button>

        <button type="submit" disabled={saving} className="btn btn-primary">
          {saving && <span className="loading loading-spinner loading-sm" />}

          {saving ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </form>
  );
};

export default ProfileForm;
