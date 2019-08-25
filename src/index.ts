import cc, { Class } from "classcat";
import isArray from "lodash/isArray";
import { createElement as el, CSSProperties } from "react";

export interface ITargetProps {
  className?: string;
  style?: CSSProperties;
  children?: any;
}

interface ClassToComponentParamsNormalized<P> {
  displayName: string;
  class: (p: P) => Class;
  element: React.ElementType<ITargetProps>;
}

type ClassToComponentParams<P = {}> =
  | string
  | string[]
  | ((p: P) => Class)
  | Partial<ClassToComponentParamsNormalized<P>>;

type TypeGuard<T> = (i: any) => i is T;

const getDisplayName = (component: React.ElementType<any>) => {
  if (typeof component === "string") return component;
  if (component.displayName) return component.displayName;
  if (typeof component === "function") {
    if (component.constructor) {
      return component.constructor.name;
    }
    return component.name;
  }
  return "Unknown";
};

const injectDefaults = <P>(
  params: Partial<ClassToComponentParamsNormalized<P>>
): ClassToComponentParamsNormalized<P> => ({
  element: "div",
  class: () => [],
  displayName: `ClassToComponent<${getDisplayName(params.element || "div")}>`,
  ...params
});

const normalizeParams = <P>(
  params: ClassToComponentParams<P>
): ClassToComponentParamsNormalized<P> => {
  if (typeof params === "string") {
    return injectDefaults({
      class: () => params,
      element: "div"
    });
  }
  if ((isArray as TypeGuard<any[]>)(params)) {
    return injectDefaults({
      class: () => params,
      element: "div"
    });
  }
  if (typeof params === "function") {
    return injectDefaults({
      class: params,
      element: "div"
    });
  }
  return injectDefaults<P>(params);
};

const classToComponent = <P extends ITargetProps>(params: ClassToComponentParams<P>): React.FunctionComponent<P> => {
  const normalized = normalizeParams<P>(params);
  const Component = (props: P) =>
    el(
      normalized.element,
      {
        className: cc(normalized.class(props)),
        style: props.style
      },
      props.children
    );
  Component.displayName = normalized.displayName;
  return Component;
};

export default classToComponent;
