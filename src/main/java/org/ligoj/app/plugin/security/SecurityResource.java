package org.ligoj.app.plugin.security;

import org.ligoj.app.resource.plugin.AbstractServicePlugin;
import org.springframework.stereotype.Service;

/**
 * The Security Collection service.
 */
@Service("securityPluginResource")
public class SecurityResource extends AbstractServicePlugin {
	/**
	 * Plug-in key.
	 */
	public static final String SERVICE_URL = BASE_URL + "/security";

	/**
	 * Plug-in key.
	 */
	public static final String SERVICE_KEY = SERVICE_URL.replace('/', ':').substring(1);

	@Override
	public String getKey() {
		return SERVICE_KEY;
	}
}
