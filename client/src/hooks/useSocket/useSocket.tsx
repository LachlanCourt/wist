import { useState, useEffect, useCallback } from "react";
import * as signalR from "@microsoft/signalr";
import { useApiEndpoints } from "../useApiEndpoints/useApiEndpoints";
import { UrlProvider } from "../../constants/UrlProvider";

type SocketRegistration = {
  messageName?: string;
  callback: (message: string) => void;
};

export const useSocket = (registrations: Array<SocketRegistration> = []) => {
  const apiUrl = useApiEndpoints();
  const hubUrl = UrlProvider.GetSocketUrl(apiUrl);

  const [connection, setConnection] = useState<signalR.HubConnection | null>(
    null
  );

  useEffect(() => {
    const newConnection = new signalR.HubConnectionBuilder()
      .withUrl(hubUrl)
      .withAutomaticReconnect([0, 2000, 10000, 30000])
      .configureLogging(signalR.LogLevel.Information)
      .build();

    newConnection.onreconnecting((error) => {
      console.log("Connection lost. Reconnecting...", error);
    });

    newConnection.onreconnected(() => {
      console.log("Reconnected successfully.");
    });

    setConnection(newConnection);
  }, []);

  useEffect(() => {
    if (connection) {
      connection
        .start()
        .then(() => {
          console.log("SignalR Connected!");

          registrations.forEach((registration) => {
            connection.on(
              registration.messageName ?? "ReceiveMessage",
              registration.callback
            );
          });

          connection.onclose((e) => {
            console.log("Connection closed.", e);
          });
        })
        .catch((err) => {
          console.error("SignalR Connection Error: ", err);
        });

      return () => {
        if (connection.state !== signalR.HubConnectionState.Disconnected) {
          connection.stop();
        }
        connection.off("ReceiveMessage");
        connection.off("reconnecting");
        connection.off("reconnected");
      };
    }
  }, [connection]);

  const sendMessage = useCallback(async () => {
    if (
      !connection ||
      connection.state !== signalR.HubConnectionState.Connected
    )
      return;

    try {
      await connection.invoke("SendMessage", "userName", "inputMessage");
    } catch (e) {
      console.error("Error sending message to server:", e);
    }
  }, [connection]);

  return sendMessage;
};
