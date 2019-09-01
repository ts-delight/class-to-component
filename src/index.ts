import cc, { ClassArray, Class } from "classcat";
import isArray from "lodash/isArray";
import castArray from "lodash/castArray";
import { createElement as el, CSSProperties, forwardRef, Ref } from "react";

interface ITargetProps {
    className?: string;
    style?: CSSProperties;
    children?: any;
    ref?: Ref<any>;
}

interface ClassToComponentParamsNormalized {
    displayName: string;
    class: ClassArray;
    element: React.ElementType<ITargetProps>;
}

interface ClassToComponentParamsObj {
    displayName?: string,
    class?: Class,
    element?: React.ElementType<ITargetProps>
}

type ClassToComponentParams =
    | ClassToComponentParamsObj
    | string
    | string[]

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

const injectDefaults = (
    params: ClassToComponentParamsObj
): ClassToComponentParamsNormalized => ({
    element: "div",
    displayName: `ClassToComponent<${getDisplayName(params.element || "div")}>`,
    ...params,
    class: castArray(params.class),
});

const normalizeParams = (params: ClassToComponentParams): ClassToComponentParamsNormalized => {
    if (typeof params === "string") {
        return injectDefaults({
            class: [params],
            element: "div"
        });
    }
    if ((isArray as TypeGuard<any[]>)(params)) {
        return injectDefaults({
            class: [...params],
            element: "div"
        });
    }
    return injectDefaults(params);
};

const classToComponent = <P extends {} = {}>(params: ClassToComponentParams) => {
    const normalized = normalizeParams(params);
    const Component = forwardRef((props: P & ITargetProps, ref) =>
        el(
            normalized.element,
            {
                ...props,
                className: cc(
                    props.className
                        ? normalized.class.concat(props.className)
                        : normalized.class
                ),
                style: props.style,
                ref
            },
            props.children
        ));

    Component.displayName = normalized.displayName;
    return Component;
};

export default classToComponent;
