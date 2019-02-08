interface IWindow {
  __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: any
  __REDUX_DEVTOOLS_EXTENSION__: any
}

declare interface IAppProps {
  children?: React.ReactNode // best, accepts everything
  functionChildren?: (name: string) => React.ReactNode // recommended function as a child render prop type
  style?: React.CSSProperties // to pass through style props
  onChange?: React.FormEventHandler<HTMLInputElement> // form events! the generic parameter is the type of event.target
  props?: Props & React.PropsWithoutRef<JSX.IntrinsicElements['button']> // to impersonate all the props of a button element without its ref
}

interface IBody extends IAppProps {
  imageToShow?: number
  switchImage?: (imgID: number) => {}
}

declare const __DEV__: string;
declare const __PROD__: string;
declare const __TEST__: string;

declare module '*.json' {
  interface IClassNames {
    [className: string]: string
  }
  const classNames: IClassNames;
  export = classNames;
}

declare module '*.css' {
  interface IClassNames {
    [className: string]: string
  }
  const classNames: IClassNames;
  export = classNames;
}

declare module '*.scss' {
  interface IClassNames {
    [className: string]: string
  }
  const classNames: IClassNames;
  export = classNames;
}

declare module '*.cssmodule.scss' {
  interface IClassNames {
    [className: string]: string
  }
  const classNames: IClassNames;
  export = classNames;
}

declare module '*.svg' {
  interface IClassNames {
    [className: string]: string
  }
  const classNames: IClassNames;
  export = classNames;
}

declare interface IServiceWorkerConfig {
  onSuccess: (registration: ServiceWorkerRegistration) => void
  onUpdate: (registration: ServiceWorkerRegistration) => void
}
