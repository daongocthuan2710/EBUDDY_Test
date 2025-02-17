"use client";

// Libraries
import { Button } from "@mui/material";

// Components
import { Header } from "@/components/Layout";
import { UserTable } from "./components";

// Stores
import { useAppDispatch } from "@/store/hooks";
import { setMessage } from "@/store/reducers";

// Constants
import { QUERY_KEYS } from "@/constants/queries";

const UpdateButton: React.FC = () => {
  const dispatch = useAppDispatch();

  const handleClick = () => {
    dispatch(setMessage(QUERY_KEYS.GET_USER_LIST));
  };

  return (
    <div className="mb-4">
      <Button
        variant="contained"
        sx={{
          mt: 2,
          backgroundColor: "#33a3dc",
          color: "white",
          "&:hover": {
            backgroundColor: "#5abee8",
          },
        }}
        onClick={handleClick}
      >
        Prefetch Data
      </Button>
    </div>
  );
};

export default function DashboardPage() {
  return (
    <div>
      <Header />
      <div className="p-4">
        <UpdateButton />
        <UserTable />
      </div>
    </div>
  );
}
