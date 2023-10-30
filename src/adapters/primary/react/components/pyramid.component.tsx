import { useAppSelector } from "../../../../store/reduxStore";
import classNames from "classnames";
import { selectPyramid } from "../selectors/pyramid/pyramid.selector";

export const Pyramid = () => {
  const pyramid = useAppSelector(selectPyramid);

  return (
    <div className="bg-purple-800 mt-3 justify-center rounded-lg text-yellow-500">
      <div className="flex flex-col w-7/12 justify-center">
        <ul className="text-end">
          {pyramid.structure.map((value) => (
            <li
              key={value}
              className={classNames("text-white", {
                "font-bold text-yellow-600": value === pyramid.currentValue,
              })}
            >
              {value}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
