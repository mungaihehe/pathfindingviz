import { FC } from "react";
import { Tab } from "@headlessui/react";
import { ShortestPathAlgorithm } from "../utils/algorithms";
import classNames from "classnames";

interface SelectAlgorithmProps {
  onSelect: (algorithm: ShortestPathAlgorithm) => any;
  selectedAlgorithm: ShortestPathAlgorithm;
}

export const SelectAlgorithm: FC<SelectAlgorithmProps> = ({
  onSelect,
  selectedAlgorithm,
}) => {
  const algorithms = [ShortestPathAlgorithm.bfs];
  return (
    <Tab.Group
      selectedIndex={algorithms.findIndex((s) => s === selectedAlgorithm)}
      onChange={(index) => onSelect(algorithms[index])}
    >
      <Tab.List className="flex py-2 px-3 space-x-1 bg-neutral-600 rounded-xl h-full">
        {algorithms.map((alg) => (
          <Tab
            key={alg}
            className={({ selected }) =>
              classNames(
                "w-full px-3 leading-5 rounded-md",
                "focus:outline-none focus:ring-2 ring-offset-2 ring-offset-blue-400 ring-white ring-opacity-60",
                selected ? "bg-neutral-500 shadow" : "text-white"
              )
            }
          >
            {alg}
          </Tab>
        ))}
      </Tab.List>
    </Tab.Group>
  );
};
