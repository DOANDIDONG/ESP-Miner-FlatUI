import { Injectable } from '@angular/core';
import { LocalStorageService } from '../local-storage.service';

const POOL_TEMPLATES_KEY = 'POOL_TEMPLATES';

export interface PoolTemplate {
  id: string;
  name: string;
  createdAt: number;
  /** Payload for PATCH /api/system (primary pool only for simplicity) */
  stratumURL: string;
  stratumPort: number;
  stratumUser: string;
  stratumPassword: string;
  stratumTLS?: number;
  stratumCert?: string;
  stratumSuggestedDifficulty?: number;
  stratumExtranonceSubscribe?: boolean;
  stratumDecodeCoinbase?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class PoolTemplateService {

  constructor(private storage: LocalStorageService) {}

  getAll(): PoolTemplate[] {
    const raw = this.storage.getObject(POOL_TEMPLATES_KEY);
    if (!raw || !Array.isArray(raw)) return [];
    return raw as PoolTemplate[];
  }

  save(template: Omit<PoolTemplate, 'id' | 'createdAt'>): PoolTemplate {
    const list = this.getAll();
    const newOne: PoolTemplate = {
      ...template,
      id: `tpl_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`,
      createdAt: Date.now()
    };
    list.push(newOne);
    this.storage.setObject(POOL_TEMPLATES_KEY, list);
    return newOne;
  }

  update(id: string, patch: Partial<PoolTemplate>): void {
    const list = this.getAll();
    const i = list.findIndex(t => t.id === id);
    if (i === -1) return;
    list[i] = { ...list[i], ...patch };
    this.storage.setObject(POOL_TEMPLATES_KEY, list);
  }

  delete(id: string): void {
    const list = this.getAll().filter(t => t.id !== id);
    this.storage.setObject(POOL_TEMPLATES_KEY, list);
  }

  /** Build PATCH payload for /api/system from a template (primary pool fields only) */
  toPatchPayload(template: PoolTemplate): Record<string, unknown> {
    return {
      stratumURL: template.stratumURL,
      stratumPort: template.stratumPort,
      stratumUser: template.stratumUser,
      stratumPassword: template.stratumPassword,
      stratumTLS: template.stratumTLS ?? 0,
      stratumCert: template.stratumCert ?? '',
      stratumSuggestedDifficulty: template.stratumSuggestedDifficulty ?? 1000,
      stratumExtranonceSubscribe: template.stratumExtranonceSubscribe ?? false,
      stratumDecodeCoinbase: template.stratumDecodeCoinbase ?? true
    };
  }
}
