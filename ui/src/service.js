/*
 * Service layer for plugin "security" (Security, service-level).
 *
 * The legacy `service/security/security.js` was `define({})` (or a thin base
 * class): the parent owns no rendering of its own. In the Vue split the
 * tool plugins own their rendering and the parent delegates the
 * subscription-row hooks (`renderFeatures`, `renderDetailsKey`,
 * `renderDetailsFeatures`) to the security-<tool> sub-plugin resolved from
 * the node id — the same pattern as `vm` → `vm-aws` and `bt` → `bt-jira`.
 *
 * Kept free of Vue SFC imports so it can be unit-tested without a DOM.
 */
import { toolPluginId, delegateFeature } from '@ligoj/host'

/**
 * Derive the sub-plugin id for a security tool subscription. A security node id
 * is `service:security:<tool>[:<instance>]` — segment 3 is the tool, so
 * `service:security:<tool>:1` → `security-<tool>`. Returns null when there is no
 * tool segment to delegate to.
 */
export const subPluginIdFor = toolPluginId

/** Delegate `action` to the security-<tool> sub-plugin; `[]` on any failure. */
export const delegateToToolPlugin = (subscription, action) => delegateFeature(subscription, action, 'security')

const service = {
  subPluginIdFor,
  delegateToToolPlugin,

  /** Subscription-row buttons — delegated wholesale to the security-<tool>. */
  renderFeatures(subscription) {
    const out = delegateToToolPlugin(subscription, 'renderFeatures')
    return out.length ? out : []
  },

  /** Resource-key chips for the details column — delegated to the tool. */
  renderDetailsKey(subscription) {
    const out = delegateToToolPlugin(subscription, 'renderDetailsKey')
    return out.length ? out : null
  },

  /** Live detail chips — delegated to the tool. */
  renderDetailsFeatures(subscription) {
    const out = delegateToToolPlugin(subscription, 'renderDetailsFeatures')
    return out.length ? out : null
  },
}

export default service
