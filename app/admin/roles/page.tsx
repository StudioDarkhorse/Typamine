import DeleteButton from "@/components/common/DeleteButton";
import { deleteRole } from "@/lib/actions/role";
import { getServerAuthSession } from "@/lib/session";
import prisma from "@/lib/prisma";
import Link from "next/link";
import { Edit, Shield, Fingerprint } from "lucide-react";
import { hasPermission, protectPage } from "@/lib/rbac";
import { Card, CardHeader, CardBody } from "../../../components/common/Card";
import TabHeading from "@/components/admin/common/TabHeading";

export default async function RoleListPage() {
  const session = await getServerAuthSession();
  await protectPage(session, 'role');

  const roles = await prisma.role.findMany({
    include: {
      _count: { select: { permissions: true, users: true } }
    },
    orderBy: { name: "asc" },
  });

  const canDelete = hasPermission(session, 'role', 'delete');
  const canCreate = hasPermission(session, 'role', 'create');
  const canUpdate = hasPermission(session, 'role', 'update');

  return (
    <div className="space-y-8 transition-colors duration-300">
      <TabHeading
        title="User Roles"
        buttonHref="/admin/roles/new"
        buttonLabel="Create Role"
        showButton={canCreate}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        {roles.map((role: any) => (
          <Card key={role.id} visualHover={true} roundness="2xl" className="h-full justify-between">
            <CardHeader className="mb-0 pb-4">
              <div className="flex items-start justify-end w-full relative">
                <div className="flex items-center gap-2 opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity duration-300 absolute top-0 right-0">
                  {canUpdate && (
                    <Link
                      href={`/admin/roles/${role.id}/edit`}
                      className="p-2.5 text-ocragray-800 dark:text-zinc-200 hover:text-black dark:hover:text-white hover:bg-white dark:hover:bg-white/10 rounded-md transition-all shadow-sm"
                    >
                      <Edit className="h-4 w-4" />
                    </Link>
                  )}
                  {canDelete && (
                    <DeleteButton
                      id={role.id}
                      name={role.name}
                      entityName="role"
                      onDelete={deleteRole}
                      confirmDescription="Ensure no users are currently assigned to this role before deletion."
                    />
                  )}
                </div>
              </div>
            </CardHeader>

            <CardBody className="pt-2 pb-6 flex-1 flex flex-col justify-between">
              <div className="pb-6">
                <h3 className="text-4xl font-rezland text-black dark:text-white leading-tight line-clamp-2 h-24 overflow-hidden flex items-start">
                  {role.name.replace(/_/g, " ")}
                </h3>
              </div>

              <div className="space-y-4 mt-auto">
                <div className="bg-white/50 dark:bg-white/5 rounded-lg p-4 border border-black/5 dark:border-white/5">
                  <p className="text-[10px] font-black uppercase tracking-tighter text-bluegray-800 dark:text-redgray-200 mb-1">Permissions</p>
                  <div className="flex items-center gap-2">
                    <Fingerprint className="h-4 w-4 text-black dark:text-white" />
                    <span className="text-2xl font-haas font-bold text-black dark:text-white">{role._count.permissions}</span>
                  </div>
                </div>
                <div className="bg-white/50 dark:bg-white/5 rounded-lg p-4 border border-black/5 dark:border-white/5">
                  <p className="text-[10px] font-black uppercase tracking-tighter text-bluegray-800 dark:text-redgray-200 mb-1">Active Users</p>
                  <div className="flex items-center gap-2">
                    <Shield className="h-4 w-4 text-red-500" />
                    <span className="text-2xl font-haas font-bold text-black dark:text-white">{role._count.users}</span>
                  </div>
                </div>
              </div>
            </CardBody>
          </Card>
        ))}
      </div>
    </div>
  );
}
