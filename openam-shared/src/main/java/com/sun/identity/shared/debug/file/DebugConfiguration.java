/**
 * The contents of this file are subject to the terms of the Common Development and
 * Distribution License (the License). You may not use this file except in compliance with the
 * License.
 *
 * You can obtain a copy of the License at legal/CDDLv1.0.txt. See the License for the
 * specific language governing permission and limitations under the License.
 *
 * When distributing Covered Software, include this CDDL Header Notice in each file and include
 * the License file at legal/CDDLv1.0.txt. If applicable, add the following below the CDDL
 * Header, with the fields enclosed by brackets [] replaced by your own identifying
 * information: "Portions copyright [year] [name of copyright owner]".
 *
 * Copyright 2015-2016 ForgeRock AS.
 */
package com.sun.identity.shared.debug.file;

/**
 * Read debug configuration
 */
public interface DebugConfiguration {

    /**
     * Get the debug prefix configuration
     *
     * @return prefix
     */
    public String getDebugPrefix();

    /**
     * Get the debug suffix configuration
     * Suffix is an empty string or contains a date format if the
     * rotation interval is enable (rotation interval > 0)
     *
     * @return suffix
     */
    public String getDebugSuffix();

    /**
     * get rotation interval in minute
     * Rotation interval can't be <= 0
     *
     * @return the number of minutes before rotating a file. If <= 0, the rotation is disable.
     */
    public int getRotationInterval();


    /**
     * get size rotation in byte
     *
     * @return the maximum file size in byte. If <= 0, the rotation is disable.
     */
    public long getRotationFileSizeInByte();

}
