import { FC, useState } from "react";
import { Popover } from "@headlessui/react";
import { usePopper } from "react-popper";
import { TileType } from "../utils/tileType";
import { TileChanger } from "../utils/changers/tilechanger";
import { StartInserter } from "../utils/changers/startinserter";
import { Coordinate } from "../utils/coordinate";
import { StopInserter } from "../utils/changers/stopinserter";

interface TileTypeChangerProps {
  onChange: (tileType: TileChanger) => any;
  coordinate: Coordinate;
}

export const TileTypeChanger: FC<TileTypeChangerProps> = ({
  children,
  onChange,
  coordinate,
}) => {
  let [referenceElement, setReferenceElement] = useState(null as any);
  let [popperElement, setPopperElement] = useState(null as any);
  let { styles, attributes } = usePopper(referenceElement, popperElement);
  return (
    <Popover>
      <Popover.Button ref={setReferenceElement}>{children}</Popover.Button>
      <Popover.Panel
        className="py-3 px-3 gap-2 flex flex-row items-center bg-neutral-700 rounded-md"
        ref={setPopperElement}
        style={styles.popper}
        {...attributes.popper}
      >
        <button
          onClick={() => onChange(new StartInserter(coordinate))}
          className="w-full px-3 leading-5 rounded-md bg-neutral-500 shadow"
        >
          start
        </button>
        <button
          onClick={() => onChange(new StopInserter(coordinate))}
          className="w-full px-3 leading-5 rounded-md bg-neutral-500 shadow"
        >
          stop
        </button>
      </Popover.Panel>
    </Popover>
  );
};
