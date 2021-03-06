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
 * Copyright 2016 ForgeRock AS.
 */

define([
    "org/forgerock/openam/ui/common/models/JSONValues"
], (JSONValues) => {
    describe("org/forgerock/openam/ui/common/models/JSONValues", () => {
        describe("#addInheritance", () => {
            const jsonValues = new JSONValues({
                propertyKey: "value"
            });

            let values;

            beforeEach(() => {
                values = jsonValues.addInheritance({
                    propertyKey: {
                        inherited: true
                    }
                });
            });

            it("creates an object for each property key", () => {
                expect(values.raw.propertyKey).to.be.an("object");
            });

            it("creates a \"value\" attribute on the property object", () => {
                expect(values.raw.propertyKey.value).to.exist;
                expect(values.raw.propertyKey.value).eq("value");
            });

            it("creates a \"inherited\" attribute on the property object", () => {
                expect(values.raw.propertyKey.inherited).to.exist;
                expect(values.raw.propertyKey.inherited).to.be.true;
            });
        });
        describe("#fromGlobalAndOrganisation", () => {
            const jsonValues = new JSONValues({
                topLevelProperty: "value",
                defaults: {
                    defaultsProperty1: "value",
                    defaultsProperty2: "value"
                }
            });
            const groupKey = "defaultGroupKey";

            let values;

            beforeEach(() => {
                values = jsonValues.fromGlobalAndOrganisation(groupKey);
            });

            it("groups the top-level values under the specified group key", () => {
                expect(values.raw).to.contain.keys(groupKey);
                expect(values.raw[groupKey]).to.have.keys("topLevelProperty");
            });

            it("flatten values in \"defaults\" onto the top-level values", () => {
                expect(values.raw).to.contain.keys("defaultsProperty1", "defaultsProperty2");
            });
        });
        describe("#removeInheritance", () => {
            it("flattens each inherited property into a single value", () => {
                const jsonValues = new JSONValues({
                    propertyKey: {
                        value: "value",
                        inherited: true
                    }
                });

                const values = jsonValues.removeInheritance();

                expect(values.raw.propertyKey).eq("value");
            });
        });
        describe("#toGlobalAndOrganisation", () => {
            const jsonValues = new JSONValues({
                "topLevelProperty1": "value",
                "topLevelProperty2": "value",
                "groupKey": {
                    "groupProperty": "value"
                }
            });
            const groupKey = "groupKey";

            let values;

            beforeEach(() => {
                values = jsonValues.toGlobalAndOrganisation(groupKey);
            });

            it("groups the top-level values under the \"defaults\" key", () => {
                expect(values.raw).to.contain.keys("defaults");
                expect(values.raw["defaults"]).to.have.keys("topLevelProperty1", "topLevelProperty2");
            });

            it("flatten values in specified group key onto the top-level values", () => {
                expect(values.raw).to.contain.keys("groupProperty");
            });
        });
    });
});
