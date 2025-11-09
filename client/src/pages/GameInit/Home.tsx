import { useState, useTransition } from "react";
import { Button } from "../../components/Button/Button";
import { Input } from "../../components/Input/Input";
import { QueryType, useQuery } from "../../hooks/useQuery/useQuery";
import { useNavigate } from "react-router";
import { useAuthorizationToken } from "../../hooks/useAuthorizationToken";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { LocalStorageKeys } from "../../constants/constants";
import { UrlProvider } from "../../constants/UrlProvider";

enum FormState {
  DEFAULT,
  HOST,
  JOIN
}

export const Home = () => {
  const [formState, setFormState] = useState<FormState>(FormState.DEFAULT);

  const [userName, setUserName] = useState<string>();
  const [gameCode, setGameCode] = useState<string>();

  const [error, setError] = useState<string>();

  const [, startTransition] = useTransition();

  const navigate = useNavigate();

  const { decodeAndSaveToken } = useAuthorizationToken();

  const handleSuccess = (responseData: object) => {
    const { gameCode } = decodeAndSaveToken(responseData as { token: string });
    navigate(`/${gameCode}`);
  };

  const { fetch: handleStart } = useQuery({
    query: UrlProvider.GetJoinGameUrl(),
    type: QueryType.POST,
    body: JSON.stringify({ userName, gameCode }),
    onSuccess: handleSuccess
  });

  const handleSubmit = () => {
    if (!userName || (formState === FormState.JOIN && !gameCode)) {
      setError("Ensure all fields are filled before starting");
      return;
    }
    handleStart();
  };

  return (
    <div className="bg-gray-100 w-screen h-screen flex justify-center flex-col">
      <h1 className="self-center py-5 text-5xl text-blue-600 font-bold">
        WIST
      </h1>

      {formState === FormState.DEFAULT && (
        <div className="flex gap-5 items-center justify-center">
          <Button onClick={() => setFormState(FormState.HOST)}>HOST</Button>
          <Button onClick={() => setFormState(FormState.JOIN)}>JOIN</Button>
        </div>
      )}

      <div className="flex flex-col items-center gap-5">
        {formState === FormState.HOST && (
          <>
            <div>
              <div>Enter Nickname</div>
              <Input
                placeholder="wistplayer3000"
                onChange={({ target }) => setUserName(target.value)}
              />
            </div>
          </>
        )}

        {formState === FormState.JOIN && (
          <>
            <div>
              <div>Enter Nickname</div>
              <Input
                placeholder="wistplayer3000"
                onChange={({ target }) => setUserName(target.value)}
              />
            </div>
            <div>
              <div>Enter Game Code</div>
              <Input
                placeholder="A8S098"
                onChange={({ target }) => setGameCode(target.value)}
              />
            </div>
          </>
        )}

        {formState !== FormState.DEFAULT && (
          <>
            <span className="text-red-500">{error}</span>
            <Button onClick={handleSubmit}>START</Button>

            <Button
              onClick={() => {
                startTransition(() => {
                  setFormState(FormState.DEFAULT);
                  setUserName(undefined);
                  setGameCode(undefined);
                });
              }}
            >
              BACK
            </Button>
          </>
        )}
      </div>
    </div>
  );
};
