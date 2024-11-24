"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { RootState } from "@/redux/store";

const ActionDropdown = ({
  name,
  actionsDropdownItems,
  data,
  renderDetails,
  fetchAction,
}: {
  name: "employees" | "paintingJobs";
  data: Employee | PaintingJob;
  actionsDropdownItems: ActionsDropdownItem[];
  renderDetails: Function;
  fetchAction: string | null;
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [action, setAction] = useState<ActionType | null>(null);

  const dispatch = useDispatch();
  const { loading, success } = useSelector((state: RootState) => {
    return state[name];
  });

  useEffect(() => {
    console.log({ action, loading, success });
    if (action && !loading && success) {
      fetchAction && dispatch({ type: fetchAction });
      setAction(null);
      closeAllModals();
    }
  }, [loading, success]);

  const closeAllModals = () => {
    setIsModalOpen(false);
    setIsDropdownOpen(false);
    setAction(null);
  };

  const handleAction = (type: string) => {
    if (!action) return;

    if (action.value === "approve") {
      dispatch({ type, payload: { id: data.id } });
    } else if (action.value === "delete") {
      dispatch({ type, payload: { id: data.id } });
    }
  };

  const renderDialogContent = () => {
    if (!action) return null;

    const { value, label, type } = action;

    return (
      <DialogContent className="shad-dialog button">
        <DialogHeader className="flex flex-col gap-3">
          <DialogTitle className="text-center text-light-100">
            {label}
          </DialogTitle>
          {value === "details" && renderDetails(data)}
          {value === "approve" && (
            <p className="approve-confirmation">
              Are you sure you want to approve?
            </p>
          )}
          {value === "delete" && (
            <p className="delete-confirmation">
              Are you sure you want to delete?
            </p>
          )}
        </DialogHeader>
        {["approve", "delete"].includes(value) && (
          <DialogFooter className="flex flex-col gap-3 md:flex-row">
            <Button onClick={closeAllModals} className="modal-cancel-button">
              Cancel
            </Button>
            <Button
              onClick={() => handleAction(type || "")}
              className="modal-submit-button"
            >
              <p className="capitalize">{value}</p>
              {loading && (
                <Image
                  src="/assets/icons/loader.svg"
                  alt="loader"
                  width={24}
                  height={24}
                  className="animate-spin"
                />
              )}
            </Button>
          </DialogFooter>
        )}
      </DialogContent>
    );
  };

  return (
    <div className="text-right">
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DropdownMenu open={isDropdownOpen} onOpenChange={setIsDropdownOpen}>
          <DropdownMenuTrigger className="shad-no-focus">
            <Image
              src="/assets/icons/dots.svg"
              alt="dots"
              width={34}
              height={34}
            />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel className="max-w-[200px] truncate">
              Action
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            {actionsDropdownItems.map((actionItem) => {
              return (
                <DropdownMenuItem
                  key={actionItem.value}
                  className="shad-dropdown-item"
                  onClick={() => {
                    setAction(actionItem);

                    if (
                      ["approve", "delete", "details"].includes(
                        actionItem.value
                      )
                    ) {
                      setIsModalOpen(true);
                    }
                  }}
                >
                  <div className="flex items-center gap-2">
                    <Image
                      src={actionItem.icon}
                      alt={actionItem.label}
                      width={30}
                      height={30}
                    />
                    {actionItem.label}
                  </div>
                </DropdownMenuItem>
              );
            })}
          </DropdownMenuContent>
        </DropdownMenu>

        {renderDialogContent()}
      </Dialog>
    </div>
  );
};
export default ActionDropdown;
