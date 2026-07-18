import PageHeader from "@/components/shared/PageHeader";
import MockForm from "@/components/shared/MockForm";

export default function ChangePasswordPage() {
  return (
    <div className="mx-auto flex w-full max-w-md flex-col gap-6">
      <PageHeader title="Change Password" description="Update the password for your student account." />
      <MockForm
        submitLabel="Update Password"
        showReference={false}
        successTitle="Password Updated"
        successMessage="This is a demo action — your password has not actually been changed."
        fields={[
          { name: "currentPassword", label: "Current Password", type: "password", required: true },
          { name: "newPassword", label: "New Password", type: "password", required: true },
          { name: "confirmPassword", label: "Confirm New Password", type: "password", required: true },
        ]}
      />
    </div>
  );
}
