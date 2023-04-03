import React, { useEffect, useState } from "react";
import _ from "lodash";
import { GithubSelector, GithubCounter } from "@charkour/react-reactions";

type Props = {
  username?: string;
};

// ['👍', '👎', '😄', '🎉', '😕', '❤️']

const Reactions = ({ username }: Props) => {
  console.log(username);

  const [state, setState] = useState({
    counters: [
      {
        emoji: "👍",
        by: "x",
      },
      {
        emoji: "😄",
        by: "x",
      },
      {
        emoji: "🎉",
        by: "x",
      },
      {
        emoji: "🤮",
        by: "x",
      },
      // {
      //   emoji: "❤️",
      //   by: "me",
      // },
      // {
      //   emoji: "😕",
      //   by: "me",
      // },
      // {
      //   emoji: "🚀",
      //   by: "me",
      // },
    ],
    user: username,
    showSelector: false,
  });

  console.log(state.counters);

  const handleAdd = () => {
    if (!username) {
      alert("sign in please");
    } else {
      setState({ ...state, showSelector: true });
    }
  };

  const handleSelect = (emoji: any) => {
    if (!username) {
      alert("sign in please");
    } else {
      const index = _.findIndex(state.counters, { emoji, by: state.user });
      if (index > -1) {
        setState({
          ...state,
          counters: [
            ...state.counters.slice(0, index),
            ...state.counters.slice(index + 1),
          ],
          showSelector: false,
        });
      } else {
        setState({
          ...state,
          counters: [...state.counters, { emoji, by: state.user }],
          showSelector: false,
        });
      }
    }
  };

  return (
    <div>
      <div
        style={{
          position: "relative",
          width: "fit-content",
          padding: "0",
          margin: "auto",
        }}
      >
        <GithubCounter
          counters={state.counters}
          user={state.user}
          onAdd={handleAdd}
          onSelect={handleSelect}
        />

        {state.showSelector ? (
          <div
            style={{
              position: "absolute",
              bottom: "100%",
              marginBottom: "10px",
            }}
          >
            <GithubSelector onSelect={handleSelect} />
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Reactions;
