export default function InstallationPage() {
  return (
    <article className="prose prose-invert max-w-none">
      <h1>Install Gizmo in Blender</h1>
      <p>Follow these steps to install the Gizmo add‑on:</p>
      <ol>
        <li>Download <code>Gizmo.zip</code> from the <a href="/success">Download page</a> or your email link.</li>
        <li>Open Blender → <strong>Edit</strong> → <strong>Preferences…</strong> → <strong>Add-ons</strong>.</li>
        <li>Click <strong>Install…</strong> and select <code>Gizmo.zip</code>.</li>
        <li>Enable the checkbox next to <strong>Gizmo</strong>.</li>
        <li>Optional: Click <strong>Save Preferences</strong>. Restart Blender if prompted.</li>
        <li>Open the <strong>N</strong> sidebar; find the <strong>Gizmo</strong> panel to start chatting.</li>
      </ol>
      <h2>Troubleshooting</h2>
      <ul>
        <li>If the add‑on doesn’t appear, ensure you selected the correct <code>.zip</code> file.</li>
        <li>Update Blender to the latest stable version (3.6+ recommended).</li>
        <li>Check the <strong>Console</strong> for errors and re‑install if needed.</li>
      </ul>
    </article>
  );
}


