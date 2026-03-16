import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../../app/api/auth/[...nextauth]/route";
import AccountSidebar from "@/components/Sidebar/Account-Sidebar";

export default async function MyAccount() {

  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  const user = session.user;

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-6">

    

      <div className="min-h-screen bg-gray-100 py-10 px-6 relative">
  {/* Account Sidebar Drawer */}
  <AccountSidebar />
    {/* Page Title */}
      <div className="max-w-6xl mx-auto mb-6">
        <h1 className="text-3xl font-bold">My Account</h1>
      </div>


        {/* Main Content */}
        <div className="col-span-3 bg-white shadow rounded-lg p-8">

          <h2 className="text-xl font-semibold mb-6">
            My Details
          </h2>


          {/* Personal Info */}
          <div className="border-b pb-6 mb-6">

            <h3 className="font-semibold mb-4 text-gray-700">
              Personal Information
            </h3>

            <div className="grid grid-cols-2 gap-4">

              <div>
                <label className="text-sm text-gray-600">
                  First Name
                </label>
                <input
                  defaultValue={user.name}
                  className="w-full border rounded p-2 mt-1"
                />
              </div>

              <div>
                <label className="text-sm text-gray-600">
                  Second Name
                </label>
                <input
                  className="w-full border rounded p-2 mt-1"
                />
              </div>

              <div>
                <label className="text-sm text-gray-600">
                  Birth Date
                </label>
                <input
                  type="date"
                  className="w-full border rounded p-2 mt-1"
                />
              </div>

              <div>
                <label className="text-sm text-gray-600">
                  Phone Number
                </label>
                <input
                  type="text"
                  className="w-full border rounded p-2 mt-1"
                />
              </div>

            </div>

            <button className="mt-6 bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
              Save
            </button>

          </div>


          {/* Email Section */}
          <div>

            <h3 className="font-semibold mb-4 text-gray-700">
              E-mail Address
            </h3>

            <input
              defaultValue={user.email}
              className="w-full border rounded p-2"
            />

          </div>

        </div>

      </div>

    </div>
  );
}