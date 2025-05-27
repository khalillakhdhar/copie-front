import { Injectable } from '@angular/core';
import { MenuItem } from 'src/app/layouts/sidebar/menu.model';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
 private _currentUserRoles: string[] = [];

  setCurrentUserRoles(roles: string[]): void {
    this._currentUserRoles = roles;
  }

  filterMenuByRole(menuItems: MenuItem[]): MenuItem[] {
    return menuItems.filter(item => {
      if (!item.roles || item.roles.length === 0) return true;
      return item.roles.some(role => this._currentUserRoles.includes(role));
    }).map(item => ({
      ...item,
      subItems: item.subItems ? this.filterMenuByRole(item.subItems) : []
    }));
  }
}