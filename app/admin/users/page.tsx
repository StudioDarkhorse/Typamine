import DeleteButton from "@/components/common/DeleteButton";
import { deleteUser } from "@/lib/actions/user";
import { hasPermission, protectPage } from "@/lib/rbac";
import { Card, CardHeader, CardBody } from "../../../components/common/Card";
import TabHeading from "@/components/admin/common/TabHeading";
import ScannedAvatar from "@/components/admin/users/ScannedAvatar"; // Importa il nuovo componente
import { getServerAuthSession } from "@/lib/session";
import prisma from "@/lib/prisma";
import Link from "next/link";
import { Edit, Mail, Shield } from "lucide-react";

export default async function UserListPage() {
  const session = await getServerAuthSession();
  await protectPage(session, "user");

  const canCreate = hasPermission(session, "user", "create");
  const canUpdate = hasPermission(session, "user", "update");
  const canDelete = hasPermission(session, "user", "delete");

  const users = await prisma.user.findMany({
    include: {
      roles: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="space-y-10">
      <TabHeading
        title="System Users"
        subtitle="Manage platform administrators and access control list"
        buttonHref="/admin/users/new"
        buttonLabel="Add User"
        showButton={canCreate}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        {users.map((user: any) => {
          // Pre-calcola la sorgente dell'immagine sul server per evitare errori di serializzazione
          let avatarSrc = null;
          if ((user as any).imageUrl) {
            avatarSrc = (user as any).imageUrl;
          } else if ((user as any).image) {
            avatarSrc = `data:image/jpeg;base64,${Buffer.from((user as any).image as any).toString('base64')}`;
          }

          return (
            <Card key={user.id} visualHover={true} roundness="2xl" className="group">
              <CardHeader className="mb-0 pb-0 relative">

                {/* Nuova sezione Avatar con LedBar integrate */}
                <ScannedAvatar
                  avatarSrc={avatarSrc}
                  userName={user.name || "User"}
                />

                {/* Pulsanti di azione riposizionati (ora assoluti rispetto all'header o alla card) */}
                <div className="flex items-center gap-2 opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity duration-300 absolute top-4 right-6 z-20">
                  {canUpdate && (
                    <Link
                      href={`/admin/users/${user.id}/edit`}
                      className="p-2.5 text-ocragray-800 dark:text-zinc-200 hover:text-black dark:hover:text-white hover:bg-white dark:hover:bg-white/10 rounded-md transition-all shadow-sm backdrop-blur-md"
                    >
                      <Edit className="h-4 w-4" />
                    </Link>
                  )}
                  {canDelete && (
                    <DeleteButton
                      id={user.id}
                      name={user.email}
                      entityName="user"
                      onDelete={deleteUser}
                      confirmDescription="This will permanently revoke access for this user."
                    />
                  )}
                </div>
              </CardHeader>

              <CardBody className="space-y-5 pt-6">
                <div>
                  <h3 className="text-3xl font-rezland text-black dark:text-white leading-tight truncate">
                    {user.name} {(user as any).surname}
                  </h3>
                  <div className="flex items-center gap-2 text-[10px] text-bluegray-800 dark:text-redgray-200 font-bold uppercase tracking-widest mt-1.5 truncate">
                    <Mail className="h-3 w-3 shrink-0" />
                    {user.email}
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  {user.roles.map((role: any) => (
                    <div key={role.id} className="px-3 py-1.5 rounded-md bg-cyan-500/10 text-zinc-600 dark:text-cyan-400 flex items-center gap-2 border border-cyan-500/20 shadow-sm">
                      <Shield className="h-3 w-3 shrink-0" />
                      <span className="text-[10px] font-black uppercase tracking-tighter">{role.name.replace(/_/g, " ")}</span>
                    </div>
                  ))}
                </div>
              </CardBody>
            </Card>
          );
        })}
      </div>
    </div>
  );
}