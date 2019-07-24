export namespace RegKey {

  /** Project description. */
  export const description = 'description';

  /** Project name. */
  export const name = 'name';

}

export namespace RegVar {

  /** Such as `{{ template }}`, use `$1` to get the template variable template. */
  export const template = /{{ ?(.+?) ?}}/g;

}
