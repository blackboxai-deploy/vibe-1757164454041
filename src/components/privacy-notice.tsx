"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";

interface PrivacyNoticeProps {
  isOpen: boolean;
  onClose: () => void;
}

export function PrivacyNotice({ isOpen, onClose }: PrivacyNoticeProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh]">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <span>Privacy & Legal Information</span>
            <Badge variant="outline" className="text-xs">Educational Demo</Badge>
          </DialogTitle>
        </DialogHeader>
        
        <ScrollArea className="h-[60vh] pr-4">
          <div className="space-y-6">
            {/* Demo Disclaimer */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h3 className="font-semibold text-blue-900 mb-2">🎓 Educational Demonstration</h3>
              <p className="text-blue-800 text-sm">
                This application is a <strong>demonstration and educational tool</strong> that shows how phone number location tracking systems work conceptually. 
                All location data is <strong>simulated</strong> and does not represent real device locations. This tool cannot and does not track real phone numbers.
              </p>
            </div>

            <Separator />

            {/* Real World Requirements */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                <span role="img" aria-label="scales of justice">⚖️</span> Real-World Legal Requirements
              </h3>
              <div className="space-y-4 text-sm text-gray-700">
                <div>
                  <h4 className="font-medium text-gray-900">Legal Authorization Required</h4>
                  <p>Real phone number location tracking is only legally permitted under these circumstances:</p>
                  <ul className="list-disc list-inside mt-2 space-y-1 ml-4">
                    <li><strong>Emergency Services:</strong> 911/emergency operators can request location for life-threatening situations</li>
                    <li><strong>Law Enforcement:</strong> Police with proper warrants or court orders</li>
                    <li><strong>User Consent:</strong> Explicit permission from the phone owner (Find My iPhone, family tracking apps)</li>
                    <li><strong>Service Provider Features:</strong> Carrier-provided location services with user opt-in</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-medium text-gray-900">Prohibited Uses</h4>
                  <p>Unauthorized location tracking is illegal and may result in:</p>
                  <ul className="list-disc list-inside mt-2 space-y-1 ml-4">
                    <li>Federal criminal charges (up to 5 years imprisonment)</li>
                    <li>Civil lawsuits and damages</li>
                    <li>Violation of privacy laws (GDPR, CCPA, etc.)</li>
                    <li>Stalking and harassment charges</li>
                  </ul>
                </div>
              </div>
            </div>

            <Separator />

            {/* Technical Limitations */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">🔧 Technical Limitations</h3>
              <div className="space-y-3 text-sm text-gray-700">
                <div>
                  <h4 className="font-medium text-gray-900">Why Regular Websites Cannot Track Phones</h4>
                  <ul className="list-disc list-inside mt-2 space-y-1 ml-4">
                    <li><strong>No Direct Carrier Access:</strong> Web applications cannot query cellular networks</li>
                    <li><strong>Privacy Protections:</strong> Modern devices block unauthorized location requests</li>
                    <li><strong>Network Security:</strong> Carrier databases are protected and require special access</li>
                    <li><strong>Platform Restrictions:</strong> App stores prohibit location tracking without consent</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-medium text-gray-900">How Real Tracking Works</h4>
                  <ul className="list-disc list-inside mt-2 space-y-1 ml-4">
                    <li><strong>E911 Systems:</strong> Emergency services have direct carrier integration</li>
                    <li><strong>SS7/Diameter Networks:</strong> Telecom infrastructure accessible only to authorized parties</li>
                    <li><strong>IMSI Catchers:</strong> Specialized equipment used by law enforcement (Stingray devices)</li>
                    <li><strong>GPS/A-GPS:</strong> Requires device cooperation and user permission</li>
                  </ul>
                </div>
              </div>
            </div>

            <Separator />

            {/* Privacy Laws */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">🛡️ Privacy Protection Laws</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div className="space-y-3">
                  <div>
                    <h4 className="font-medium text-gray-900">United States</h4>
                    <ul className="list-disc list-inside mt-1 space-y-1 ml-2 text-gray-700">
                      <li>Fourth Amendment protections</li>
                      <li>Electronic Communications Privacy Act</li>
                      <li>California Consumer Privacy Act (CCPA)</li>
                      <li>State-specific stalking laws</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-900">European Union</h4>
                    <ul className="list-disc list-inside mt-1 space-y-1 ml-2 text-gray-700">
                      <li>General Data Protection Regulation (GDPR)</li>
                      <li>ePrivacy Directive</li>
                      <li>Right to privacy under Article 8 ECHR</li>
                      <li>National cybercrime laws</li>
                    </ul>
                  </div>
                </div>

                <div className="space-y-3">
                  <div>
                    <h4 className="font-medium text-gray-900">Other Jurisdictions</h4>
                    <ul className="list-disc list-inside mt-1 space-y-1 ml-2 text-gray-700">
                      <li>Canada: PIPEDA and Privacy Acts</li>
                      <li>Australia: Privacy Act 1988</li>
                      <li>Brazil: Lei Geral de Proteção de Dados</li>
                      <li>India: Information Technology Act</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-900">Penalties</h4>
                    <ul className="list-disc list-inside mt-1 space-y-1 ml-2 text-gray-700">
                      <li>GDPR: Up to €20M or 4% global revenue</li>
                      <li>CCPA: Up to $7,500 per violation</li>
                      <li>Federal charges: Up to 5 years prison</li>
                      <li>Civil damages: Unlimited liability</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <Separator />

            {/* Legitimate Use Cases */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">✅ Legitimate Location Services</h3>
              <div className="space-y-3 text-sm text-gray-700">
                <div>
                  <h4 className="font-medium text-gray-900">With User Consent</h4>
                  <ul className="list-disc list-inside mt-2 space-y-1 ml-4">
                    <li><strong>Find My Device:</strong> Apple Find My, Google Find My Device</li>
                    <li><strong>Family Safety:</strong> Life360, Google Family Link</li>
                    <li><strong>Fleet Management:</strong> Commercial vehicle tracking</li>
                    <li><strong>Location Sharing:</strong> WhatsApp, iMessage location sharing</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-medium text-gray-900">Emergency Services</h4>
                  <ul className="list-disc list-inside mt-2 space-y-1 ml-4">
                    <li>Enhanced 911 (E911) automatic location</li>
                    <li>Search and rescue operations</li>
                    <li>Medical emergency response</li>
                    <li>Natural disaster evacuation assistance</li>
                  </ul>
                </div>
              </div>
            </div>

            <Separator />

            {/* Educational Purpose */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">📚 Educational Purpose</h3>
              <div className="text-sm text-gray-700 space-y-2">
                <p>
                  This demonstration helps users understand:
                </p>
                <ul className="list-disc list-inside mt-2 space-y-1 ml-4">
                  <li>How location tracking technology works conceptually</li>
                  <li>The legal and technical barriers that protect privacy</li>
                  <li>Why claims of "phone tracking by number" are usually scams</li>
                  <li>The importance of proper authorization and consent</li>
                  <li>How to identify and avoid fraudulent tracking services</li>
                </ul>
              </div>
            </div>

            {/* Contact & Resources */}
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
              <h4 className="font-medium text-gray-900 mb-2">📞 Resources & Reporting</h4>
              <div className="text-sm text-gray-700 space-y-1">
                <div><strong>Report Illegal Tracking:</strong> Contact local law enforcement or FBI IC3.gov</div>
                <div><strong>Privacy Violations:</strong> File complaints with FTC (US) or ICO (UK)</div>
                <div><strong>Legal Assistance:</strong> Consult with privacy law attorneys</div>
                <div><strong>Technical Security:</strong> Contact your mobile carrier for suspicious activity</div>
              </div>
            </div>
          </div>
        </ScrollArea>

        <div className="flex justify-end pt-4 border-t">
          <Button onClick={onClose} className="px-6">
            I Understand
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}