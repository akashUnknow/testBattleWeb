import ProfileStats from "./ProfileStats";
import ProfileForm from "./ProfileForm";

const ProfileTab = ({ form, onSubmit }) => {
  return (
    <div className="grid md:grid-cols-3 gap-6">
      <ProfileStats
        totalScore={form.watch("totalScore")}
        testsCompleted={form.watch("testsCompleted")}
        rank={form.watch("rank")}
      />
      <ProfileForm form={form} onSubmit={onSubmit} />
    </div>
  );
};

export default ProfileTab;
